# Images

Copy the images from the [specialklinikdk-site](https://github.com/ScaleGroup-ApS/specialklinikdk-site) repo so the site uses the same assets:

From `specialklinikdk-site/public/images/` copy:

- `Forside-specialklinik-Taastrup (2).jpg` – hero image
- `pexels-daniel-frank-305565 (2).jpg` – child image (Klinikken/Vision section)
- `Specialklinik_logo.svg` – logo (optional, for header/footer)
- `Klinikken-scaled (1).jpg` – clinic (optional)
- `specialklinik-omskaering-scaled (1).jpg` – procedure (optional)

Or clone and copy in one go:

```bash
git clone --depth 1 https://github.com/ScaleGroup-ApS/specialklinikdk-site.git _tmp
cp -r _tmp/public/images/* public/images/
rm -rf _tmp
```
