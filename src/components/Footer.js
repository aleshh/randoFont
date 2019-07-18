import React from 'react';
import { Link } from '@material-ui/core'
import { LocalPizza } from '@material-ui/icons';

const iconStyle = {
  position: 'relative',
  top: 4,
  fontSize: 16,
}

function Footer() {
  return (
    <p style={{ textAlign: 'center', marginTop: -6, marginBottom: 10 }}>
      Made with <LocalPizza style={ iconStyle } /> by <Link color="secondary" href="https://alesh.com/">Alesh</Link>, 2019. <Link color="secondary" href="https://github.com/aleshh/randoFont">GitHub</Link>.
    </p>
  );
}

export default Footer;