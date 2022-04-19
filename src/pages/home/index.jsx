import React, { useEffect, useState } from "react";
import { IonPage, IonButton } from "@ionic/react";
import "./styles.scss";

const Home = () => {
  return (
    <IonPage>
      <div className="home-page">
        <div className="heading">
          <IonButton routerLink="/user">User</IonButton>
          <IonButton routerLink="/task">Task</IonButton>
        </div>
      </div>
    </IonPage>
  );
}

export default Home;
