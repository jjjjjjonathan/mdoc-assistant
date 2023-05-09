# MDOC Assistant

[MDOC Assistant](https://mdoc.jcheng.ca) is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`. This is an updated version of my [`L1O-stats`](https://github.com/jjjjjjonathan/L1O-stats) from 2022.

## What does this app do?

I created this app to simplify the tasks a Match-Day Operations Coordinator (MDOC) while on the sideline of a [League1 Ontario](https://www.league1ontario.com) match. Having to create image graphics through Canva or Photoshop can be difficult in high-pressure situations, especially for those who are not design or tech-savvy. This app can build the graphics for you once you submit information into a form. It is my hope that this would make it easier to complete these tasks in any weather (so if it's raining for example, you can still do everything from your phone as I made MDOC Assistant mobile-friendly).

Currently, a user (MDOC) can create their assigned matches to access the right information and graphics for each team participating in a match. Once a match is created, the user can use the provided tweet templates so the league can maintain a uniform style/voice on social media. You can also scrape the web pages of each roster to get player info to create starting lineup graphics with provided alt-text for screen readers. `TinyColor` is used to determine whether black or white font should be used in the created graphics to meet [WCAG 2 Color and Contrast Web Acessibility guidelines](https://webaim.org/resources/contrastchecker/).

## Tech stack

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Clerk](https://clerk.com/)
- [Jimp](https://github.com/jimp-dev/jimp)
- [TinyColor](https://github.com/bgrins/TinyColor)

## What's next?

- [ ] Add checklists for other MDOC tasks
- [ ] Create invoices to send to the league for each match worked
- [ ] Change layouts of pages
- [ ] Upgrade to Next.js 13.4 app directory
