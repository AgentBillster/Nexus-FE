import React, {useContext} from 'react';
import {PlayerSetup} from '../PlayerScreens/PlayerSetup';
import PlayerTabs from '../PlayerScreens/PlayerTabs';
import {AuthContext} from '../AuthStuff/AuthProvider';
import VenueFTS from '../VenueScreens/VenueFTS';

const toSetup = {
  player: <PlayerSetup />,
  venue: <VenueFTS />,
};

const toDash = {
  player: <PlayerTabs />,
  venue: <VenueFTS />,
};

export default function Dispatch() {
  const {user} = useContext(AuthContext);

  if (user.setup === false) {
    return toSetup[user.role];
  } else {
    return toDash[user.role];
  }
}

// take in user obj
// check if user is venue or player
// if user has gone thru setup send to dash
// if user has not gone thru setup send to setupstack

//
//'
//
//
