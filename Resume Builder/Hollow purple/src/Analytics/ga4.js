import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-QWP0601R98"); 
};

export const trackPage = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });

  
};
