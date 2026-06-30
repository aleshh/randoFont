import React from 'react';
import { Pizza } from 'lucide-react';

function Footer() {
  return (
    <footer className="site-footer">
      Made with <Pizza className="footer-icon" size={16} aria-hidden="true" /> by <a href="https://alesh.com/">Alesh</a>, 2019-26. <a href="https://github.com/aleshh/randoFont">GitHub</a>.
    </footer>
  );
}

export default Footer;
