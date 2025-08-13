// Credit to: https://typst.app/universe/package/clickworthy-resume
#import "@preview/clickworthy-resume:1.0.1": *

// Personal Information
#let name = "Chris Kennedy"
#let email = "ckennedy0323@gmail.com"
#let github = "github.com/cck37"
#let linkedin = "linkedin.com/in/chris-kennedy-00879182"
#let website = "cck37.github.io"
#let contacts = (
  [#link("mailto:" + email)[#email]],
  [#link("https://" + website)[#website]],
  [#link("https://" + github)[#github]],
  [#link("https://" + linkedin)[#linkedin]],
)
#let location = ""

// Professional Summary
#let summary = ""

// Resume configuration
#let theme = rgb("#006fcd")
#let font = "New Computer Modern"
#let fontSize = 11pt
#let lang = "en"
#let margin = (
  top: 0.5cm,
  bottom: 0cm,
  left: 1cm,
  right: 1cm,
)

// Resume Header and configuration
#show: resume.with(
  author: name,
  location: location,
  contacts: contacts,
  summary: summary,
  theme-color: theme,
  font: font,
  font-size: fontSize,
  lang: lang,
  margin: margin,
)

// Experience
= Experience
#exp(
  title: "Senior Software Engineer",
  organization: "Workwave",
  date: "September 2017 - Present",
  location: "Holmdel, NJ",
  details: [
    - Architected and built an SSO capable login app and migration tools using AWS Cognito and MUI for >50k login requests daily
    - Created and planned an import utility using AWS Step Functions and Lambdas to process >100K records from CSVs into a MSSQL database
    - Researched and developed a React + .NET application to replace a legacy payment processing system, reducing processing errors by 90%
    - Increased case throughput of offshore teams by 200%.
  ]
)

#exp(
  title: "Jr. Software Developer",
  organization: "Thomson Reuters IP&S",
  date: "September 2015 - March 2016",
  location: "Philadelphia, PA",
  details: [
    - Maintained Angular 2 production code.
    - Developed a web application to pull analytics on servers' build status using D3.js
  ]
)

#exp(
  title: "Tech/DevOps Assistant",
  organization: "Lockheed Martin ATL",
  date: "September 2014 - March 2015",
  location: "Cherry Hill, NJ",
  details: [
    - Performed large-scale IT management and Jr. sys admin roles using Ansible
    - Worked within government-mandated security
    - Built out cloud services for ~200 users
  ]
)


// Projects
= Projects
#exp(
  title: link("https://randle.day")[Randle (Random Wordle-Like Puzzele)],
  details: [
    - Developed a Wordle-like game where players guess a random item from a random category each day (e.g.: "Animated Disney Movies", "Green Day Songs", etc)
    - Full stack web application built with Next.js, MUI, and Prisma.
    - Implemented a custom backend API with Prisma and PostgreSQL.
  ]
)

#exp(
  title: link("https://github.com/streeeggs/coolhole/")[Coolhole (Synchronous media viewing platform)],
  details: [
    - Forked a popular open-source project to create a custom platform  for sharing and watching videos with friends
    - Implemented features like a points system, gambling mechanics, and chat effects
    - Migrated from Node 8 to Node 20
  ]
)

#exp(
  title: link("https://cck37.github.io")[Personal Website],
  details: [
    - Created a personal website to showcase my projects and resume
    - Emulates PS2 start screen with 3D graphics and animations
    - Built with Astro, TypeScript, and React Three Fiber
  ],
)

// Education
= Education
#edu(
  institution: "Drexel University",
  date: "Sep 2012 - May 2017",
  location: "Philadelphia, PA",
  degrees: (
    ("B.S.", "Computer Science"),
  ),
  extra: "",
)

// Skills
= Skills
#skills((
  ("Expertise", (
    [Full Stack Web Development],
    [SQL Badness],
    [Payment Processing],
    [SSO],
    [Cloud Architecture],
    [Project Management],
    [System Monitoring],
    [CI/CD Automation],
  )),
  ("Languages", (
    [Typescript],
    [C\#],
    [SQL],
    [Python],
    [VBScript],
    [Rust],
    [Elixir],
    [C],
    [C++],
  )),
  ("Frameworks", (
    [React],
    [Next.js],
    [Vue.js],
    [Node.js],
    [jQuery],
    [MUI],
    [shadcn/ui],
    [.NET],
    [Flask],
    [Tauri],
    [Electron],
    [Phoenix LiveView],
  )),
  ("Databases", (
    [MSSQL],
    [PostgreSQL],
    [MySQL],
    [MongoDB],
    [Redis],
  )),
  ("Software", (
    [AWS],
    [Jira],
    [Git],
    [OpenSearch],
    [Teamcity],
    [Dromo],
    [Twilio],
    [Docker]
  )),
  ("Hobbies", (
    [Surfer],
    [Rock Climber],
    [Programmer],
    [Gamer],
    [Snowboarder],
    [Snowmobiler]
  )),
))
