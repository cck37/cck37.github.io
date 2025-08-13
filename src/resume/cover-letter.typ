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
  [#link("https://" + github)[#github]],
  [#link("https://" + linkedin)[#linkedin]],
  [#link("https://" + website)[#website]],
)
#let location = "Brick, NJ"

// Addressee Information
#let addressee-name = "Ondra Aikau"
#let addressee-institution = "Buckets & Tubes Surf Climb Innovations"
#let addressee-address = "123 Summit Wave Blvd"
#let addressee-city = "Radville"
#let addressee-state = "CO"
#let addressee-country = "USA"
#let addressee-zip = "80401"

// Resume configuration
#let date = datetime.today().display()
#let font = "New Computer Modern"
#let fontSize = 11pt
#let lang = "en"
#let margin = (
  top: 1cm,
  bottom: 1cm,
  left: 1cm,
  right: 1cm,
)

// Cover letter Header and configuration
#show: cover-letter.with(
  author: name,
  location: location,
  contacts: contacts,
  date: date,
  addressee-name: addressee-name,
  addressee-institution: addressee-institution,
  addressee-address: addressee-address,
  addressee-city: addressee-city,
  addressee-state: addressee-state,
  addressee-country: addressee-country,
  addressee-zip: addressee-zip,
  font: font,
  font-size: fontSize,
  lang: lang,
  margin: margin,
)

// Body of the cover letter
Dear #addressee-name,

I am thrilled to apply for the Senior Software Engineer position at #addressee-institution. As someone who thrives on tackling challenges, whether it's sending runout 5.12s or surfing 12ft Jaws, I believe my unique blend of technical expertise and adventurous spirit aligns perfectly with your mission to revolutionize the innovative intersection of free climbing and surfing.

At Workwave, I architected and built an SSO-capable login app and migration tools using AWS Cognito and MUI, handling over 50k login requests daily. I also created an import utility using AWS Step Functions and Lambdas to process over 100k records from CSVs into an MSSQL database. Additionally, I researched and developed a React + .NET application to replace a legacy payment processing system, reducing processing errors by 90%. As a Tech Lead, I increased offshore team throughput by 200% while maintaining the highest case completions.

At Thomson Reuters IP&S, I maintained Angular 2 production code and developed a web application to pull analytics on servers' build statuses using D3.js. At Lockheed Martin ATL, I performed large-scale IT management and Jr. sys admin roles using Ansible, built out cloud services for ~200 users, and worked within government-mandated security protocols.

Beyond my professional experience, I've pursued personal projects that reflect my passion for innovation. I developed *Randle*, a Wordle-like game with random categories, and *Coolhole*, a synchronous media viewing platform with unique features like gambling mechanics and chat effects. My personal website, inspired by the PS2 start screen, showcases my creativity and technical skills in Astro, React Three Fiber, and TypeScript.

I am excited about the opportunity to contribute to #addressee-institution's mission of blending adrenaline-fueled adventures with cutting-edge technology. Whether it's designing immersive gaming experiences or building robust systems to support your vision, I am eager to bring my skills and enthusiasm to your team.

Thank you for considering my application. I would love the chance to discuss how my background and passions align with #addressee-institution's goals.

Sincerely,  
Chris Kennedy