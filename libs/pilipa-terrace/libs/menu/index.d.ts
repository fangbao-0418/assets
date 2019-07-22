import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import SubMenu from './SubMenu';
interface Props {
    theme?: 'dark';
    mode?: 'inline';
    selectedKeys: string[];
    openKeys: string[];
}
declare class Main extends React.Component<Props> {
    static Item: typeof Item;
    static SubMenu: typeof SubMenu;
    static childContextTypes: {
        openKeys: PropTypes.Requireable<any[]>;
        selectedKeys: PropTypes.Requireable<any[]>;
    };
    getChildContext(): {
        openKeys: string[];
        selectedKeys: string[];
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    init(): void;
    hideAllMenu(cur?: any): void;
    render(): JSX.Element;
}
export default Main;
