import { ThemeProvider } from 'styled-components'
import Login from './pages/Login'
import { GlobalStyles, theme } from './styles'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Login />
    </ThemeProvider>
  )
}

export default App
