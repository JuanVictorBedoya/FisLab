
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import NavbarStyle from '../styles/navbar.scss';

/****************************************************************************************/

class NavLink extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li>
				<div className="nav-link">
					<a>{this.props.text}</a>
				</div>
			</li>
		);
	}
}

class NavBrand extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let LogoComponent = this.props.logoComponent;
		return (
			<li>
				<div className="nav-brand">
					<LogoComponent style={this.props.logoStyle}/>
				</div>
			</li>
		);
	}
}

class NavUser extends React.Component {
	constructor(props) {
		super(props);

		this.status = {
			preventDefault: true
		};
	}

	componentDidMount() {
		let uopt = this.refs.userOpt.classList;
		window.addEventListener('click', ()=>{
			if (uopt.contains('nav-user-dropdown-show') && this.status.preventDefault) {
				uopt.remove('nav-user-dropdown-show');
			}
			this.status.preventDefault = true;
		});
	}

	onClickSummary() {
		this.status.preventDefault = false;
		this.refs.userOpt.classList.toggle('nav-user-dropdown-show');
	}

	render() {
		return (
			<li className="nav-right">
				<div className="nav-user">
					<summary className="nav-user-wrapper" onClick={this.onClickSummary.bind(this)}>
						<img src={this.props.user.picture} className="nav-user-img"/>
						<span>
							<svg version="1.0" viewBox="0 0 8 8">
								<path d="M0 2l4 4 4-4H0z" ></path>
							</svg>
						</span>
					</summary>
					<div ref="userOpt" className="nav-user-dropdown arrow-up">
						<div className="dropdown-boxarrow-up"></div>
						<div className="nav-user-name">
							<span>
								<i>
									<svg version="1.0" viewBox="0 0 512 514.5" className="nav-user-icon">
										<path d="M256 2C114.61 2 0 116.61 0 258s114.61 256 256 256 256-114.61 256-256S397.39 2 256 2zm0 472c-119.297 0-216-96.703-216-216S136.703 42 256 42s216 96.703 216 216-96.703 216-216 216zm69.906-165.812c-16-2.734-37.906-18.25-37.906-24.984v-17.016c0-6.344 8.594-18.22 12.25-29.156.344-1.03 2.547.156 4.688-2.453 4.03-4.97 4.625-12.517 5.547-15.954 1.47-5.406-5.094-5.625-5.094-5.625s4.892-28.374.548-46.296c-5.875-24.406-37.5-36.703-49.875-36.703-12.39 0-43.97 12.298-49.875 36.704-4.344 17.922.656 46.297.656 46.297s-6.328.22-4.875 5.626c.937 3.438 1.968 10.984 6.03 15.953 2.125 2.608 3.406 1.42 3.75 2.452 3.656 10.938 12.25 22.812 12.25 29.156v17.016c0 6.734-21.922 22.25-37.922 24.984-20.547 3.5-30.703 17.703-25.89 53.125 2.405 17.688 49.093 25.297 95.343 24.64 46.25.657 93.642-6.952 96.048-24.64 4.828-35.422-5.11-49.625-25.672-53.125z"></path>
									</svg>
								</i>
								<b>{this.props.user.name}</b>
							</span>
						</div>

						{this.props.children}
					</div>
				</div>
			</li>
		);
	}
}

NavUser.defaultProps = {
	user: {
		name: 'Undefined',
		picture: ''
	}
};

class NavUserLink extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<a className="nav-user-link">
				<span>{this.props.text}</span>
			</a>
		);
	}
}

class NavUserActionButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<a className="nav-user-link" onClick={this.props.onClick}>
				<span>{this.props.text}</span>
			</a>
		);
	}
}

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav>
				<ul className="nav-wrapper">
					{this.props.children}
				</ul>
			</nav>
		);
	}
}

export { Navbar, NavLink, NavBrand, NavUser, NavUserLink, NavUserActionButton };
