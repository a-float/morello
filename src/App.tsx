import './App.css';
import { Component } from 'react'
import SheetManager from './components/SheetManager'
import SettingsManager from './components/SettingsManager'
import Box from '@mui/material/Box'

import TopBar from './components/TopBar'

type AppState = {
	isSheetsDrawerOpen: boolean,
	isSettingsDrawerOpen: boolean
}

class App extends Component<{}, AppState> {
	state: AppState = {
		isSheetsDrawerOpen: false,
		isSettingsDrawerOpen: false
	}

	toggleSheetDrawer = (toggle: boolean) => {
		this.setState({ ...this.state, isSheetsDrawerOpen: toggle })
	}
	toggleSettingsDrawer = (toggle: boolean) => {
		this.setState({ ...this.state, isSettingsDrawerOpen: toggle })
	}


	render() {
		return (
			<Box className="App, light-gradient-bg" sx={{ overflowX: "hidden", height: "100vh", display: 'flex', flexDirection: 'column' }}>
				<TopBar isSheetDrawerOpen={this.state.isSheetsDrawerOpen}
					onToggleSheetDrawer={this.toggleSheetDrawer}
					onToggleSettingsDrawer={this.toggleSettingsDrawer} />
				<SheetManager onToggleDrawer={this.toggleSheetDrawer} isDrawerOpen={this.state.isSheetsDrawerOpen} />
				<SettingsManager onToggleDrawer={this.toggleSettingsDrawer} isDrawerOpen={this.state.isSettingsDrawerOpen} />
			</Box >
		)

	}
}

export default App;
