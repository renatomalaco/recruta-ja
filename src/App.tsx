import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import Candidatos from './pages/Candidatos'
import EmpresaCultura from './pages/EmpresaCultura'
import EmpresaPainel from './pages/EmpresaPainel'
import Entrevista from './pages/Entrevista'
import Empresas from './pages/Empresas'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Perfil from './pages/Perfil'
import Quiz from './pages/Quiz'
import Trilha from './pages/Trilha'
import Vagas from './pages/Vagas'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Nav />
        <main id="conteudo">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/candidatos" element={<Candidatos />} />
            <Route path="/candidato/quiz" element={<Quiz />} />
            <Route path="/candidato/perfil" element={<Perfil />} />
            <Route path="/candidato/vagas" element={<Vagas />} />
            <Route path="/candidato/trilha/:jobId" element={<Trilha />} />
            <Route path="/candidato/entrevista" element={<Entrevista />} />
            <Route path="/candidato/entrevista/:jobId" element={<Entrevista />} />
            <Route path="/empresa/cultura" element={<EmpresaCultura />} />
            <Route path="/empresa/painel" element={<EmpresaPainel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </MotionConfig>
  )
}
