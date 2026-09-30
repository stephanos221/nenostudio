import { Lines } from "@/components/ui/Lines";
import { PasswordForm } from "@/components/widgets/PasswordForm";
import { bracket } from "@/lib/text";

/** Full-bleed "this page is private" screen with the password form. */
export function PasswordScreen({ failed }: { failed: boolean }) {
  return (
    <div className="section_error password-page form-shell">
      <div className="hero_image">
        <img
          src="/assets/images/image-c1cc5210.avif"
          loading="lazy"
          sizes="(max-width: 2048px) 100vw, 2048px"
          srcSet="/assets/images/image-e0b95689.avif 500w, /assets/images/image-24966f45.avif 800w, /assets/images/image-8e42a2d2.avif 1080w, /assets/images/image-c47762f9.avif 1600w, /assets/images/image-fc0ae002.avif 2000w, /assets/images/image-c1cc5210.avif 2048w"
          alt=""
          className="image-cover"
        />
        <div className="hero_scrim is-home" />
      </div>
      <div className="error_inner">
        <div className="label-mono light">{bracket("Access / 401")}</div>
        <div className="error_heading">
          <h1 className="heading light-2 heading-style-h1 is-inverse">
            <Lines lines={["This one ", "needs a key."]} />
          </h1>
        </div>
        <div className="error_description">
          <p className="error_text">
            This page is private. It needs an invite, a login, or a link that has not expired yet. Ask us for access, or
            head back to the public work.
          </p>
        </div>
      </div>
      <PasswordForm failed={failed} />
    </div>
  );
}
