import style from "../Banner/Banner.module.scss"
import React from "react";

function Banner() {
    return (
        <div className={style.banner}>
            <img src="/banner.svg" alt="Banner"/>
        </div>
    );
}

export default Banner;
