import { useLocation, useNavigate } from "react-router-dom";

function isExternal(href) {
  return /^(https?:|mailto:|tel:)/i.test(href || "");
}

function scrollToHash(hash, attempts = 0) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const element = document.getElementById(hash.replace(/^#/, ""));

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (attempts < 10) {
    window.setTimeout(() => scrollToHash(hash, attempts + 1), 80);
  }
}

export default function AppLink({ href = "/", onClick, children, ...props }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (isExternal(href)) {
    return (
      <a href={href} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  function handleClick(event) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();

    const [pathPart, hashPart] = href.split("#");
    const path = pathPart || location.pathname || "/";
    const hash = hashPart ? `#${hashPart}` : "";
    const destination = `${path}${hash}`;

    if (destination === `${location.pathname}${location.hash}`) {
      scrollToHash(hash);
      return;
    }

    navigate(destination);
    window.setTimeout(() => scrollToHash(hash), 60);
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
