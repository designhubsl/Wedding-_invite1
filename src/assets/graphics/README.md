# Custom Graphics

This folder is already wired into the code — you don't need to edit any
`.tsx` files. Just replace the placeholder images below with your own
Photoshop/Illustrator exports, **keeping the exact same filenames**, then
flip one switch.

## Files to replace

| File | Exact size | Notes |
|---|---|---|
| `envelope/envelope-back.png` | **900 × 600 px** | Full opaque rectangle — the back of the envelope. Corners can be square; the app rounds them slightly in code. |
| `envelope/envelope-front.png` | **900 × 408 px** | The lower front pocket. Needs a transparent "V" cut into the top edge (a triangular notch dipping down to the center) — the code also clips this shape for you, but matching it in the art avoids any visible seam. |
| `envelope/envelope-flap.png` | **900 × 384 px** | The top flap. Paint only the triangular flap shape; everything outside the triangle should be transparent. |
| `envelope/wax-seal.png` | **300 × 300 px** | Circular wax seal, ideally with your monogram baked into the art already. |
| `floral-corner.png` | **400 × 400 px, transparent background** | One floral spray, used (and automatically flipped/rotated by code) in every corner across the site — Hero, Our Story, Event Details, Thank You. |

All should be **PNG with a transparent background** except `envelope-back.png`,
which is fully opaque.

## Turning them on

Once your files are in place, open `src/data/invitation.ts` and change:

```ts
useCustomGraphics: false,
```
to
```ts
useCustomGraphics: true,
```

That's the only code change needed — every envelope layer and every
floral corner across the site switches to your artwork at once. Set it
back to `false` any time to instantly revert to the built-in look.

## Why these exact dimensions

They match the proportions the animation code already uses (the envelope
is a 3:2 rectangle, the flap covers the top 64% of its height, the front
pocket the bottom 68%), so your art lines up pixel-for-pixel with no
stretching or gaps. Exporting at roughly 3x the on-screen display size
(these dimensions) keeps everything crisp on retina phone screens.
