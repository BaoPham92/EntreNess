import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkAuth } from '../../actions/auth'

export const DashBoard = (props) => (
    <div className="container__main">
        <div className="template__main">

            {/* 
            News section is a temporary filler.
            More complex components for dashboard will be developed.
            */}

                <div className="container__intro">
                    <section className="dashboard--section">
                        <h2 className="dashboard--title">Current News</h2>
                    </section>
                    <div className="penta-bar"></div>
                </div>
            
            <section className="dashboard-section-main">
                <h3>Incoming Features:</h3>
                <ul>
                    <li>Create your own business</li>
                    <li>Employ members to the business</li>
                    <li>Create events related to your business</li>
                </ul>
                
                {/* 
                None of these are actual priorities. 
                Personal interest of implementations only.
                The main focus is reinforcing GrapQL & Apollo skillsets.
                */}

                <h3>Proposals:</h3>

                <ul>
                    <li>
                    (RW) For Business to consumer contracts - 
                    A solution instead of (CRUD) which fails to provide real authentication compared to today's review apps.
                    </li>
                    <li>Mobile app conversion.</li>
                    <li>Multi focus instead of business only. Entreprenuership isn't the only form of skill to business for personal growth.</li>
                </ul>
            </section>

        </div>
        {!props.auth.userId && <Redirect to="/" />}
    </div>
)

const mapToStateProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapToStateProps)(DashBoard)