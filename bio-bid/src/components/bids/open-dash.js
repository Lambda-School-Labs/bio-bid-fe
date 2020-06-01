import React, { useState } from 'react';

/* STYLE IMPORT */
import './styles/open-sidebar.css';
import './styles/global.css';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* IMAGE IMPORTS */
import Projects from '../../images/projects.png';
// import Settings from '../images/settings.png';
// import DefaultAvatar from '../images/profile-avatar.png';
// import { ReactComponent as ReviewsIcon } from '../images/reviews-1.svg';
import { ReactComponent as ProfilePic } from '../../images/profile-pic.svg';
// import { ReactComponent as PieChartIcon } from '../images/pie-chart.svg';
// import { ReactComponent as DashExpandIcon } from '../images/dash-expand.svg';
import { ReactComponent as DashCollapseIcon } from '../../images/dash-collapse.svg';
// import { ReactComponent as SearchStudiesIcon } from '../images/search-studies.svg';
// import { ReactComponent as RecommendationsIcon } from '../images/recommendations.svg';

/* This is the dashboard sidebar. This contains the dashboard navigation. */
function OpenDash(props) {

    // True to collapse the side bar, false to open it. This variable is managed by the Dash Sidebar control icons, DashCollapseIcon and DashExpandIcon.
    const [ collapsed ] = useState(true);

    return(
        <div id='sidebar-open-wrapper' className={ ( props.dashOpen ? 'sidebar-open' : 'sidebar-closed' ) }>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <DashCollapseIcon className='dash-control-icon' onClick={ () => { props.process(false); props.shadow(); } } />
            </div>
            <ProfilePic className={'pfp ' + (collapsed ? 'pfp-collapsed' : '')} />
            <div id='pfp-container'>
                <p className={'pfp-text-2 '}>Dr. Venter</p>
            </div>
            <hr className='menu-bar' />
            <div className='profile-menu-container selected'>
                <img src={Projects} style={{ filter: 'contrast(100%)' }} className={'menu-icon-img ' + (collapsed ? 'menu-icon-img-collapsed' : '')} alt='' />
                <p className={'profile-menu-text '}>Current Projects</p>
            </div>
            {/* <div className='profile-menu-container menu-option-disabled'>
                <PieChartIcon className={'profile-menu-icon ' + (collapsed ? 'menu-icon-collapsed' : '')} />
                <p className={'profile-menu-text '}>Manage Bids</p>
            </div>
            <div className='profile-menu-container menu-option-disabled'>
                <RecommendationsIcon className={'profile-menu-icon ' + (collapsed ? 'menu-icon-collapsed' : '')} />
                <p className={'profile-menu-text '}>Recommendations</p>
            </div>
            <div className='profile-menu-container menu-option-disabled'>
                <SearchStudiesIcon className={'profile-menu-icon ' + (collapsed ? 'menu-icon-collapsed' : '')} />
                <p className={'profile-menu-text '}>Search Studies</p>
            </div>
            <div className='profile-menu-container menu-option-disabled'>
                <ReviewsIcon className={'profile-menu-icon ' + (collapsed ? 'menu-icon-collapsed' : '')} />
                <p className={'profile-menu-text '}>Reviews</p>
            </div>
            <hr className='menu-bar' />
            <div className='profile-menu-container menu-option-disabled'>
                <img src={Settings} className={'profile-menu-icon ' + (collapsed ? 'menu-icon-collapsed' : '')} />
                <p className={'profile-menu-text '}>Settings</p>
            </div>
            <div className='profile-menu-container menu-option-disabled'>
                <p className='profile-menu-text menu-text-collapsed' style={{ marginLeft: '15px' }}>Log out</p>
            </div> */}
        </div>
    );

}

export default OpenDash;