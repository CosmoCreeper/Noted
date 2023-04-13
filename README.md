# Noted!
A WIP task management app built for epic noting far beyond the transparency and capabilities of the likes of Sticky Notes.

- [x] More than a Checkbox
- [x] It's a life!
- [ ] Is sticky notes good?
- [x] Creating tasks since 2023.

To download the newest but not completely stable version, go to the site: https://noted-kcf.w3spaces.com/. Just simply download it from there and follow the steps in the txt after extracting, pretty straightforward. This will install the app. The above link is the official website that I designed. Not the most modern but it's something.

### NOTED IS A WIP APP AND NOT ALL THE FEATURES WILL WORK RIGHT AWAY. I WILL UPDATE THE LINK EVERY TIME I COMPLETE A VERSION. I TRIED UPLOADING HERE BUT I JUST GET A LARGE FILE SIZE ERROR.

| Version      | Type      | Release    |
|--------------|-----------|------------|
| v0.0.3.2     | Demo      | 4/13/2023  |
| v0.0.3.3     | Stable/WIP| WIP        |

title: "Population Analysis"
author: "Noted!"
date: "18 December 2022"
output:
  html_document:
    code_folding: "hide"
params:
  Which is Used More & Enjoyed More?:
    value: Noted!
    choices:
      - Noted!
      - Sticky Notes
      - Google Keep
  Range:
    input: slider
    min: 2000
    max: 2023
    step: 1
    round: 1
    sep: ''
    value: [2015, 2023]
