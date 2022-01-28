import React from 'react';
import './brand.css'
import Google from '../../assets/google.png'
import Slack from '../../assets/slack.png'
import Atlassian from '../../assets/atlassian.png'
import Dropbox from '../../assets/dropbox.png'
import Shopify from '../../assets/shopify.png'

const Brand = () => {
  return <div className='gpt3__brand'>
    <div className='gpt3__brand-container'>
      <img src={Google}/>
      <img src={Slack}/>
      <img src={Atlassian}/>
      <img src={Dropbox}/>
      <img src={Shopify}/>
    </div>
  </div>;
};

export default Brand;
