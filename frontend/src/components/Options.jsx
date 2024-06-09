import React from 'react';
import { Button, TextField, Grid, Typography, Container, Paper} from '@babel/core';
import {makeStyles} from '@material-ui/core/styles';
import {copyToClipboard} from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { SocketContext } from '../SocketContext';

const Options = ({children}) => {
  return (
    <div>Options
        {children}
    </div>
  )
}

export default Options;