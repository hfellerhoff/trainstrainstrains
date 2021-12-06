import React from 'react';
import {atom} from 'recoil';

export const favorites = atom({
    key: 'favorites',
    default: {}
  });

