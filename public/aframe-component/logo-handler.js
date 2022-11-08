const handleRedirect = (element, link) => {
  if (!element) return;
  element.addEventListener("click", () => {
    window.location.href = link;
  });
};

const handleLogoClick = () => {
  const facebookLogo = document.getElementById("facebook");
  const instagramLogo = document.getElementById("instagram");
  const linkedinLogo = document.getElementById("linkedin");

  handleRedirect(facebookLogo, "https://www.facebook.com/mywebar/");
  handleRedirect(instagramLogo, "https://www.instagram.com/mywebar/");
  handleRedirect(
    linkedinLogo,
    "https://www.linkedin.com/company/devar-official/"
  );
};

handleLogoClick();
