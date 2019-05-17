import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import NavbarMobile from '../navbar/NavbarMobile';
import Footer from '../footer/Footer'
import FooterNavigation from '../cards/FooterNavigation';
import Section from '../section/Section';
import PieChart from '../charts/PieChart';
import BarChart from '../charts/BarChart';
import Cookies from 'js-cookie';

class RulesMain extends Component
{
    constructor()
    {
        super();
        this.state={
            rulePicked:{},
        }
    }
    render()
    {
        return(
            <div>
                <Navbar position="relative" backgroundColor="black"></Navbar>
                <NavbarMobile></NavbarMobile>
                <Section>
                    <div className="rule-container">
                        <div className="rule-container-selector"></div>
                        <div className="rule-container-content">
                            <div className="rule-content">

                            </div>
                            <div className="rule-content-handler">
                                <i className="fas fa-chevron-circle-left"></i>
                                <i className="fas fa-check-circle" style={{color:'#28a745'}}></i>
                                <i className="fas fa-chevron-circle-right"></i>
                            </div>
                        </div>
                    </div>
                </Section>
                <Footer>
                </Footer>
            </div>
        )
    }
}
export default RulesMain;