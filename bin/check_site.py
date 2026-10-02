"""Check the generated site preserves essential routes and only references shipped assets."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys


class AssetReferences(HTMLParser):
    """Collect browser-loaded script, stylesheet, and image paths."""

    def __init__(self):
        """Initialize the parser and collected references."""
        super().__init__()
        self.paths = []

    def handle_starttag(self, tag, attrs):
        """Record local resources that must be shipped with each page."""
        attrs = dict(attrs)
        if tag in {"script", "img"}:
            self.paths.append(attrs.get("src", ""))
        elif tag == "link" and attrs.get("rel") == "stylesheet":
            self.paths.append(attrs.get("href", ""))


def main():
    """Fail if routes, domain, CV, or any referenced local browser asset are missing."""
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
    required = ["index.html", "blog/index.html", "publications/index.html", "projects/index.html", "news/index.html", "cv/index.html", "podcast/index.html", "404.html", "cv.pdf", "feed.xml", "sitemap.xml"]
    errors = [f"Missing route: {name}" for name in required if not (root / name).is_file()]
    if not (root / "CNAME").is_file() or (root / "CNAME").read_text().strip() != "www.alihkw.com":
        errors.append("Custom domain CNAME changed or missing")
    if (root / "cv.pdf").is_file() and not (root / "cv.pdf").read_bytes().startswith(b"%PDF"):
        errors.append("CV is not a PDF")
    pages = list(root.rglob("*.html"))
    for page in pages:
        parser = AssetReferences()
        parser.feed(page.read_text(errors="replace"))
        for reference in parser.paths:
            url = urlsplit(reference)
            if not url.path or url.scheme or url.netloc:
                continue
            target = root / unquote(url.path.lstrip("/")) if url.path.startswith("/") else page.parent / unquote(url.path)
            if not target.is_file():
                errors.append(f"{page.relative_to(root)} references missing asset {reference}")
    if errors:
        raise SystemExit("\n".join(sorted(set(errors))))
    print(f"Verified {len(pages)} HTML pages, required routes, browser assets, CV and custom domain.")


if __name__ == "__main__":
    main()
