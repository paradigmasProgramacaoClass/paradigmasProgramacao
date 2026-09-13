import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

/**
 * PageHeader - Header de páginas internas
 * @param {Object} props
 * @param {string} props.titulo - Título principal da página
 * @param {string} props.subtitulo - Texto descritivo abaixo do título
 * @param {string} props.voltarPara - Rota para o link "← Voltar"
 * @param {string} props.voltarTexto - Texto do link de voltar (default: "Voltar")
 */
export default function PageHeader({
  titulo,
  subtitulo,
  voltarPara = "/home",
  voltarTexto = "Voltar",
}) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <Link
          to={voltarPara}
          className="inline-flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {voltarTexto}
        </Link>
        <h1 className="text-heading-md font-bold text-foreground">{titulo}</h1>
        {subtitulo && (
          <p className="text-paragraph text-muted-foreground mt-1">{subtitulo}</p>
        )}
      </div>
      <span className="text-sm font-semibold text-tertiary-700 tracking-wide uppercase">
        MEU CURRÍCULO
      </span>
    </div>
  )
}
