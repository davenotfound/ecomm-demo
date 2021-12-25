import React from "react";
import SHOP_DATA from './shop.data.js';
import CollectionPreview from "../../components/collection/collection-preview.component.jsx";
import "./shop.styles.scss";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        shopData: SHOP_DATA
    }
  }

  render() {
    const { shopData } = this.state;

    return <div className="shop-page">
      {
        shopData.map(({id, ...otherCollectionProps}) => (
          <CollectionPreview key={id} {...otherCollectionProps}/>
        ))
      }
    </div>
  }
}

export default ShopPage;