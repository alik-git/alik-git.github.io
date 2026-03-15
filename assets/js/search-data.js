// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            
              window.location.href = "/blog/";
            
          },
        },{id: "nav-cv",
          title: "cv",
          description: "My current resume",
          section: "Navigation",
          handler: () => {
            
              window.location.href = "/cv.pdf";
            
          },
        },{id: "nav-papers",
          title: "papers",
          description: "A list of my papers",
          section: "Navigation",
          handler: () => {
            
              window.location.href = "/publications/";
            
          },
        },{id: "nav-projects",
          title: "projects",
          description: "I like to keep things open-source :)",
          section: "Navigation",
          handler: () => {
            
              window.location.href = "/projects/";
            
          },
        },{id: "nav-podcast",
          title: "podcast",
          description: "My podcast, chatterPractice",
          section: "Navigation",
          handler: () => {
            
              window.location.href = "https://anchor.fm/chatterpractice";
            
          },
        },{id: "post-visualizing-why-machines-learn",
        
          title: "Visualizing Why Machines Learn",
        
        description: "Interactive visuals to accompany the book.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/visuallearn/";
          
        },
      },{id: "post-casual-book-review-zero-to-one",
        
          title: "Casual Book Review: Zero to One",
        
        description: "by Blake Masters and Peter Thiel",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/021/";
          
        },
      },{id: "post-casual-book-review-a-promised-land",
        
          title: "Casual Book Review: A Promised Land",
        
        description: "by Barack Obama",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/promisedland/";
          
        },
      },{id: "post-casual-book-review-mindset",
        
          title: "Casual Book Review: Mindset",
        
        description: "by Carol S. Dweck",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/mindset/";
          
        },
      },{id: "news-co-founded-the-utm-robotics-club-as-head-of-operations",
          title: 'Co-founded the UTM Robotics Club as Head of Operations! 🦾',
          description: "",
          section: "News",},{id: "news-received-the-nserc-undergraduate-student-research-award",
          title: 'Received the NSERC Undergraduate Student Research Award! 🤓',
          description: "",
          section: "News",},{id: "news-the-equivariant-representations-paper-was-accepted-to-icra-2022",
          title: 'The Equivariant Representations paper was accepted to ICRA 2022! 🎉',
          description: "",
          section: "News",},{id: "news-conceptfusion-was-accepted-to-rss-️",
          title: 'ConceptFusion was accepted to RSS! 🏛️',
          description: "",
          section: "News",},{id: "news-conceptgraphs-was-accepted-to-icra",
          title: 'ConceptGraphs was accepted to ICRA! 🌸',
          description: "",
          section: "News",},{id: "news-k-scale-launched-the-k-bot-for-preorders",
          title: 'K-Scale launched the K-Bot for preorders! 🤖',
          description: "",
          section: "News",},{id: "projects-uncertainty-estimation-not-so-bayes-ic",
          title: 'Uncertainty Estimation: Not So Bayes-ic',
          description: "Modelling Uncertainty in Neural Networks.",
          section: "Projects",handler: () => {
              
                window.location.href = "/projects/bayes/";
              
            },},{id: "projects-feature-visualization-in-neural-networks",
          title: 'Feature Visualization in Neural Networks.',
          description: "Visualizing how Neural Networks build up their understanding of images.",
          section: "Projects",handler: () => {
              
                window.location.href = "https://github.com/alik-git/Feature-Visualization-Notebook/blob/master/Feature-Visualization.ipynb";
              
            },},{id: "projects-duckietown-mbrl-lib-2",
          title: 'Duckietown MBRL-Lib 2',
          description: "Model based reinforcement learning with Gym-Duckietown.",
          section: "Projects",handler: () => {
              
                window.location.href = "https://www.alihkw.com/duckietown-mbrl-lib";
              
            },},{id: "projects-neocirkuits",
          title: 'Neocirkuits',
          description: "A puzzle game for Android based on graph theory problems.",
          section: "Projects",handler: () => {
              
                window.location.href = "https://github.com/alik-git/NeoCirkuits";
              
            },},{id: "projects-backwards-reachability-tutorial",
          title: 'backwards reachability tutorial',
          description: "Using reachability analysis to compute safety guarantees for safety critical dynamic systems.",
          section: "Projects",handler: () => {
              
                window.location.href = "https://rvl.cs.toronto.edu/backwards-reachability/";
              
            },},{id: "projects-theory-of-anything-transcripts",
          title: 'Theory of Anything Transcripts',
          description: "Episode transcripts I made for the Theory of Anything podcast.",
          section: "Projects",handler: () => {
              
                window.location.href = "https://www.alihkw.com/TheoryOfAnythingTranscripts/";
              
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/cv.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%6C%69.%68%71%6B@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=5Q7kQgIAAAAJ", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/alihkw_", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/alihkw", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/alik-git", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
