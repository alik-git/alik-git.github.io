"""Verify citation updates recover from an absent or unusable local cache."""
import contextlib
import io
from pathlib import Path
import runpy
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import Mock, patch

import yaml


SCRIPT = Path(__file__).resolve().parents[1] / "bin/update_scholar_citations.py"


class CitationCacheTest(unittest.TestCase):
    """Run the real update command with a stubbed Scholar response."""

    def test_update_recovers_from_missing_or_invalid_cache(self):
        """Write fresh citations when the cache is missing, malformed, or not a mapping."""
        for previous in (None, "invalid: [", "- not a citation mapping"):
            with self.subTest(previous=previous), tempfile.TemporaryDirectory() as source:
                data = Path(source) / "_data"
                data.mkdir()
                (data / "socials.yml").write_text("scholar_userid: test-user\n")
                if previous is not None:
                    (data / "citations.yml").write_text(previous)
                scholar = Mock()
                scholar.fill.return_value = {
                    "publications": [{"pub_id": "paper-1", "bib": {"title": "Paper", "pub_year": "2026"}, "num_citations": 3}]
                }
                with (
                    contextlib.chdir(source),
                    contextlib.redirect_stdout(io.StringIO()),
                    patch.dict(sys.modules, {"scholarly": SimpleNamespace(scholarly=scholar)}),
                ):
                    runpy.run_path(str(SCRIPT), run_name="__main__")
                result = yaml.safe_load((data / "citations.yml").read_text())
                self.assertEqual(result["papers"]["paper-1"]["citations"], 3)
                scholar.search_author_id.assert_called_once_with("test-user")


if __name__ == "__main__":
    unittest.main()
