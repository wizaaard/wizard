import {SwipeableDrawer} from '@material-ui/core';
import {ListItemProps} from '@material-ui/core/ListItem';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {DrawerHeader} from '../../ui';
import {InjectStore} from '../../utils';

import {UserAvatar} from './@user-avatar';
import {UserItem} from './user-item';

const Wrapper = styled.div``;

const HeaderIcon = styled(AssignmentIndIcon)`
  font-size: 30px;
` as ComponentType<ListItemProps>;

const AvatarWrapper = styled.div`
  padding: 60px;
`;

export class Profile extends Component {
  render(): ReactNode {
    return (
      // <SwipeableDrawer
      //   open={isViewProfilePanel}
      //   anchor="right"
      //   onOpen={toggleViewProfilePanel}
      //   onClose={toggleViewProfilePanel}
      // >
      <>
        <DrawerHeader title="个人信息" icon={<HeaderIcon />} />
        <Wrapper>
          <AvatarWrapper>
            <UserAvatar />
          </AvatarWrapper>
          <UserItem />
        </Wrapper>
      </>
      // </SwipeableDrawer>
    );
  }
}
