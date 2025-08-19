# My Personal Site

![Screenshot of my site](demo-image.png)
![Second sceenshot of my site](demo-image2.png)

Welcome to my personal website! This was a fun project I decided to undertake while procrastinating on updating my resume.

---

## 🚀 Tech Stack

This project is built with:

- **[Astro](https://astro.build/)**: Because I _had_ to use React for a static page but I wanted it to be fast(er)
- **[TypeScript](https://www.typescriptlang.org/)**: Because type safety on a rarely visited static site with a single developer has saved so much time and not because everyone else uses it
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)**: Because Three.jS was too scary
- **[Copilot](https://github.com/features/copilot)**: Because the best use of an LLM to write my readme for me

---

## 🌟 Features

- **3D Graphics**: I stared at the PS2 start screen too much so I've cemented it as part of my identity
- **Modern Web Development**: See "Following trends". More seriously tho, R3F makes 3D work so easy.
- **Responsive Design**: Works\* seamlessly** across devices\***...maybe
- **Showcase of Projects**: Likely will come off as more impressive than anything else I've done

---

## 📂 Project Structure (already outdated)

The project didn't deviate from the standard Astro structure because I don't know how else this would work besides don't you have eyes and can scroll up ok whatever here:

```text
/
├── public/                # Static assets (e.g., images, icons)
│   └── favicon.svg        # Favicon for the site
├── src/
│   ├── assets/            # Project-specific assets
│   │   └── astro.svg      # Project specific asset being the unused starter image I forgot to remove
│   ├── components/        # "Reusable" UI components + whole pages disguised as components so I can transition between sceens without reload
│   │   ├── Menu.tsx       # Menu "component"
│   │   ├── Orb.tsx        # Orb component (actual reuse)
│   │   ├── StartingGrid.tsx # Starting grid "component"
│   │   └── CubeGridCanvas.tsx # This doesn't even exist. GPT made it up but I kept it here anyway
│   ├── layouts/           # Layout components for pages
│   │   └── Layout.astro   # Main layout for the site + errant styles
│   ├── hooks/             # Custom React hooks
│   │   ├── useBouncingOrbAnimation.ts # The bed that has all the monsters hiding under it
│   │   └── useTowerCameraAnimation.ts # The closet that isn't much better
│   ├── pages/             # Site pages
│   │   ├── index.astro    # Unchanged from astro cli
│   │   └── css-attempt.tsx # Also not real but still funny to me
│   ├── styles/            # SCSS styles for the project
│   │   └── global.scss    # Unnecessary use of SCSS just to get "lighten"
│   └── utils/             # Utility functions
│       └── utils.ts       # Helper functions aka: Another rug to sweep under
├── gatsby-config.ts       # Gatsby configuration file
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
└── LICENSE                # License for the project
```

## 📸 Demo

[http://localhost:4321/](https://cck37.github.io/)

## 🛠️ Development

1. Don't (it's just `npm i` and `npm run dev` anyway)

## 🤝 Contributing

You're welcome to make me look better. I won't be compensating you though.

## 📄 License

If you're interested in stealing this, go for it. You'll probably be worse off but, as a fellow thief myself, I can empathize.

## 🙌 Acknowledgments

- Sony + PS2 for obvious reasons
- [This guy did this better in only CSS](https://codepen.io/haja-ran/pen/ExYpoZp)
- Drei does a lot of what little R3F doesn't do for you
