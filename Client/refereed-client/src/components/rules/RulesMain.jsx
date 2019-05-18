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
                        <div className="rule-container-selector">
                            <div>
                                <div className="rule-button-container">
                                    <div className="rule-button">Rule 1</div>
                                    <div data-toggle="collapse" className="rule-collapse-button" data-target="#collapse_test">
                                        <i className="fas fa-arrow-down"></i>
                                    </div>
                                </div>
                                
                                <div className="collapse" id="collapse_test">
                                    <div className="rule-button-sub">
                                        Rule name
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="rule-button-container">
                                    <div className="rule-button">Rule 2</div>
                                    <div data-toggle="collapse" className="rule-collapse-button" data-target="#collapse_test2">
                                        <i className="fas fa-arrow-down"></i>
                                    </div>
                                </div>
                                
                                <div className="collapse" id="collapse_test2">
                                    <div className="rule-button-sub">
                                        Rule name
                                    </div>
                                    <div className="rule-button-sub">
                                        Rule name 2
                                    </div>
                                    <div className="rule-button-sub">
                                        Rule name 3
                                    </div>
                                </div>
                            </div><div>
                                <div className="rule-button-container">
                                    <div className="rule-button">Rule 1</div>
                                    <div data-toggle="collapse" className="rule-collapse-button" data-target="#collapse_test">
                                        <i className="fas fa-arrow-down"></i>
                                    </div>
                                </div>
                                
                                <div className="collapse" id="collapse_test">
                                    <div className="rule-button-sub">
                                        Rule name
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="rule-button-container">
                                    <div className="rule-button">Rule 2</div>
                                    <div data-toggle="collapse" className="rule-collapse-button" data-target="#collapse_test2">
                                        <i className="fas fa-arrow-down"></i>
                                    </div>
                                </div>
                                
                                <div className="collapse" id="collapse_test2">
                                    <div className="rule-button-sub">
                                        Rule name
                                    </div>
                                    <div className="rule-button-sub">
                                        Rule name 2
                                    </div>
                                    <div className="rule-button-sub">
                                        Rule name 3
                                    </div>
                                </div>
                            </div><div>
                                <div className="rule-button-container">
                                    <div className="rule-button">Rule 1</div>
                                    <div data-toggle="collapse" className="rule-collapse-button" data-target="#collapse_test">
                                        <i className="fas fa-arrow-down"></i>
                                    </div>
                                </div>
                                
                                <div className="collapse" id="collapse_test">
                                    <div className="rule-button-sub">
                                        Rule name
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="rule-button-container">
                                    <div className="rule-button">Rule 2</div>
                                    <div data-toggle="collapse" className="rule-collapse-button" data-target="#collapse_test2">
                                        <i className="fas fa-arrow-down"></i>
                                    </div>
                                </div>
                                
                                <div className="collapse" id="collapse_test2">
                                    <div className="rule-button-sub">
                                        Rule name
                                    </div>
                                    <div className="rule-button-sub">
                                        Rule name 2
                                    </div>
                                    <div className="rule-button-sub">
                                        Rule name 3
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rule-container-content">
                            <div className="rule-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus purus quam, consequat ac augue a, malesuada feugiat odio. Etiam pellentesque metus sed convallis egestas. Aliquam tincidunt gravida lorem sed volutpat. In quis ante ipsum. Proin a orci elit. Sed ullamcorper ut tellus non ultrices. Maecenas vel tellus at augue malesuada lacinia. Sed eros eros, commodo iaculis cursus a, iaculis vitae eros. Vestibulum at vestibulum nibh. Phasellus porttitor nisl eget ex mollis, eu ornare enim commodo. Quisque sit amet augue neque.</p>
                                <p>Suspendisse vel scelerisque est, maximus tempor risus. Aliquam nisl metus, suscipit id tellus a, fermentum rhoncus nisl. Nam ultricies magna non purus porta, a hendrerit justo dapibus. Curabitur convallis, nisi id dictum iaculis, nulla dolor auctor felis, vel iaculis orci erat in dui. Sed vel volutpat ligula, ornare consequat diam. Suspendisse rhoncus, magna vitae viverra luctus, orci enim venenatis ipsum, fringilla scelerisque lorem diam elementum mauris. Quisque tempus turpis sit amet augue aliquam ornare. Integer et ipsum scelerisque, vestibulum turpis ut, lacinia massa. Nunc accumsan nulla eget ipsum vehicula, in sagittis est volutpat. Aenean lacinia auctor pharetra. Aenean sed nisi sed neque vestibulum vehicula. Quisque auctor, arcu eget aliquet porttitor, enim sem viverra velit, in iaculis velit odio at ante. Sed vel suscipit dui. Aliquam venenatis lacinia eleifend. Pellentesque mi ipsum, aliquet sed pharetra a, scelerisque vitae elit. Praesent nisl nisi, convallis ac justo et, egestas pellentesque urna.</p>
                                <p>Praesent efficitur pharetra eros euismod tempus. Nullam scelerisque molestie feugiat. Sed sit amet efficitur justo. Etiam a libero ac nunc egestas dapibus. Fusce eleifend nisi viverra, dignissim urna vel, varius lectus. Pellentesque sit amet tincidunt elit. Nunc cursus diam sagittis nibh pharetra, non pellentesque orci laoreet. Vivamus maximus sem ut nibh tincidunt sollicitudin. Etiam congue risus id lorem ultricies, non tincidunt est hendrerit. Quisque imperdiet nunc erat, ut fermentum sem congue id.</p>
                                <p>Fusce nec nisi risus. Nulla vel ultricies quam, eu condimentum leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut fermentum ex, id sollicitudin orci. Praesent sed diam nisi. Donec ornare augue id nisi maximus, at viverra urna aliquet. Sed quis risus tortor. Nullam cursus lectus sem, ac rhoncus sapien placerat ut. Nulla id molestie diam, at interdum erat. Pellentesque consectetur eros dolor, non tristique leo viverra sed. Curabitur quis dolor ac massa rutrum fermentum. Nam eu egestas mi, eu faucibus nisl.</p>
                                <p>Praesent eget sapien condimentum, viverra metus sit amet, aliquam quam. In consectetur odio dictum, eleifend orci dictum, faucibus turpis. Praesent laoreet libero ac finibus placerat. Proin quis ipsum erat. Sed sed erat consectetur dolor convallis iaculis quis nec erat. Aenean interdum feugiat erat, a aliquet nisl euismod quis. Donec ultrices finibus varius. Ut feugiat elementum dapibus. Etiam vitae ex vitae nisl elementum blandit tincidunt nec massa. Pellentesque dictum, neque ac imperdiet blandit, elit nulla fringilla sem, ut fermentum ipsum urna eget purus. Curabitur non elit sit amet metus imperdiet scelerisque ac luctus arcu. Donec viverra tristique orci, a dignissim elit. Nulla vel tellus congue, fringilla erat eget, malesuada eros. Suspendisse lectus augue, convallis et ligula ut, elementum porta enim.</p>
                                <p>Praesent eget sapien condimentum, viverra metus sit amet, aliquam quam. In consectetur odio dictum, eleifend orci dictum, faucibus turpis. Praesent laoreet libero ac finibus placerat. Proin quis ipsum erat. Sed sed erat consectetur dolor convallis iaculis quis nec erat. Aenean interdum feugiat erat, a aliquet nisl euismod quis. Donec ultrices finibus varius. Ut feugiat elementum dapibus. Etiam vitae ex vitae nisl elementum blandit tincidunt nec massa. Pellentesque dictum, neque ac imperdiet blandit, elit nulla fringilla sem, ut fermentum ipsum urna eget purus. Curabitur non elit sit amet metus imperdiet scelerisque ac luctus arcu. Donec viverra tristique orci, a dignissim elit. Nulla vel tellus congue, fringilla erat eget, malesuada eros. Suspendisse lectus augue, convallis et ligula ut, elementum porta enim.</p>
                                <p>Praesent eget sapien condimentum, viverra metus sit amet, aliquam quam. In consectetur odio dictum, eleifend orci dictum, faucibus turpis. Praesent laoreet libero ac finibus placerat. Proin quis ipsum erat. Sed sed erat consectetur dolor convallis iaculis quis nec erat. Aenean interdum feugiat erat, a aliquet nisl euismod quis. Donec ultrices finibus varius. Ut feugiat elementum dapibus. Etiam vitae ex vitae nisl elementum blandit tincidunt nec massa. Pellentesque dictum, neque ac imperdiet blandit, elit nulla fringilla sem, ut fermentum ipsum urna eget purus. Curabitur non elit sit amet metus imperdiet scelerisque ac luctus arcu. Donec viverra tristique orci, a dignissim elit. Nulla vel tellus congue, fringilla erat eget, malesuada eros. Suspendisse lectus augue, convallis et ligula ut, elementum porta enim.</p>
                            </div>
                            <div className="rule-content-handler">
                                <i onClick={(e)=>{window.alert('Hi!')}} className="fas fa-chevron-circle-left"></i>
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