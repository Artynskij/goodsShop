import React from "react";
import { NavBar } from "../../components/NavBar";
import { Marketing } from "../../components/Marketing";
import { GoodsCategory } from "../../components/Goods";
import { Header } from "../../components/Header";


export class MainPage extends React.Component {
  render() {
    return (
      <div>
        <div><Header/></div>
        <div style={{ padding:"105px 0 0 0", display: "flex" }}>
          <NavBar />
          <Marketing />
        </div>

        <GoodsCategory />
      </div>
    );
  }
}
