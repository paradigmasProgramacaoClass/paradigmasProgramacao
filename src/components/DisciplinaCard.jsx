import { Lock, Check } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * DisciplinaCard - Card de disciplina reutilizável
 *
 * Variantes:
 * - "disponivel": borda dourada/marrom, badge de créditos, requisitos cumpridos
 * - "bloqueada": texto cinza, ícone de cadeado
 * - "concluida": borda verde, checkbox marcada, fundo verde sutil
 * - "pendente": borda cinza, checkbox desmarcada
 *
 * @param {Object} props
 * @param {string} props.nome - Nome da disciplina
 * @param {"disponivel"|"bloqueada"|"concluida"|"pendente"} props.variante
 * @param {number} props.creditos - Número de créditos
 * @param {string} props.info - Texto extra (requisitos, bloqueio, etc.)
 * @param {function} props.onClick - Handler de clique (opcional)
 */
export default function DisciplinaCard({
  nome,
  variante = "pendente",
  creditos,
  info,
  onClick,
}) {
  const estilos = {
    disponivel:
      "border-2 border-tertiary-500 bg-white hover:shadow-md cursor-pointer",
    bloqueada: "border border-regular-300 bg-regular-100 opacity-70",
    concluida:
      "border-2 border-primary-700 bg-primary-700/5 hover:shadow-md cursor-pointer",
    pendente:
      "border border-regular-300 bg-white hover:border-regular-400 hover:shadow-sm cursor-pointer",
  }

  return (
    <div
      className={cn(
        "rounded-xl p-4 transition-all flex items-center justify-between gap-3",
        estilos[variante]
      )}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-medium text-sm truncate",
            variante === "bloqueada" ? "text-regular-500" : "text-foreground"
          )}
        >
          {nome}
        </p>
        {info && (
          <p
            className={cn(
              "text-xs mt-0.5 truncate",
              variante === "bloqueada"
                ? "text-regular-400"
                : variante === "concluida"
                  ? "text-primary-700"
                  : "text-muted-foreground"
            )}
          >
            {variante === "concluida"
              ? `${creditos} Créditos • Concluída`
              : variante === "pendente"
                ? `${creditos} Créditos • Pendente`
                : info}
          </p>
        )}
      </div>

      {/* Badge / Ícone */}
      {variante === "disponivel" && creditos && (
        <span className="shrink-0 text-xs font-semibold bg-tertiary-700 text-white px-2.5 py-1 rounded-md uppercase">
          {creditos} créd
        </span>
      )}

      {variante === "bloqueada" && (
        <Lock className="w-4 h-4 text-regular-400 shrink-0" />
      )}

      {variante === "concluida" && (
        <div className="w-7 h-7 rounded-md bg-primary-700 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      {variante === "pendente" && (
        <div className="w-7 h-7 rounded-md border-2 border-regular-300 shrink-0" />
      )}
    </div>
  )
}
