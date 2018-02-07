import { connect } from 'react-redux';
import Header from "./Header";
import { setPageHeader } from "../../actions/common";

const mapStateToProps = (state) => {
    console.log('Inside HeaderContainer.mapStateToProps', state);
    return {
        pageHeader: state.commonApp.setPageHeader
    };
};

const HeaderContainer = connect(
    mapStateToProps)(Header);

export default HeaderContainer;

