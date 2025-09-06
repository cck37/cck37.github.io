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
src/
├── animationStore.ts       # Animation state management
├── assets/                 # Two useless svgs and my resume
├── components/
│   ├── BackgroundPlane.tsx
│   ├── Canvas.tsx
│   ├── ChasingOrbs.tsx
│   ├── GlassBox.tsx
│   ├── Main.tsx
│   ├── Orb.tsx
│   └── Tower.tsx
├── layouts/                # Astro made me do it
│   └── Layout.astro
├── pages/                  # Site pages
├── resume/                 # Resume and cover letter files
├── scenes/                 # Scene-specific apps and logic
│   ├── Menu/
│   │   ├── Menu.tsx
│   │   ├── constants.ts
│   │   ├── hooks/
│   │   │   └── useChasingOrbAnimation.ts  # Probably the worst file of this project
│   │   └── utils.ts
│   ├── Towers/
│       ├── TowersScene.tsx
│       ├── constants.ts
│       └── hooks/
│           ├── useRandomOrbMovement.ts
│           └── useTowerCameraAnimation.ts
├── styles/                 # Unnecessary SCSS styles for the project
│   └── global.scss
└── utils/                  # Bed to shove stuff under
    ├── canvasProps.ts
    ├── colorUtils.ts
    └── utils.ts
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
