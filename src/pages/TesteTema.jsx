import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TesteTema() {
  const [nome, setNome] = useState("")

  const amostras = [
    { label: "900", className: "bg-primary-900" },
    { label: "800", className: "bg-primary-800" },
    { label: "700", className: "bg-primary-700" },
    { label: "600", className: "bg-primary-600" },
    { label: "500", className: "bg-primary-500" },
    { label: "400", className: "bg-primary-400" },
    { label: "300", className: "bg-primary-300" },
    { label: "200", className: "bg-primary-200" },
    { label: "100", className: "bg-primary-100" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary text-heading-md">Teste do tema</CardTitle>
          <CardDescription className="text-paragraph">
            Verificando paleta, tipografia, espaçamento e bordas arredondadas.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-label font-semibold">Seu nome</Label>
            <Input
              id="nome"
              placeholder="Digite aqui"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button>Primário</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="destructive">Destrutivo</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>

          <div className="grid grid-cols-9 gap-1">
            {amostras.map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-1">
                <div className={`h-10 w-10 rounded-md ${a.className}`} />
                <span className="text-xs text-muted-foreground text-label">{a.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-end gap-spacing-token-s">
            <div className="w-spacing-token-xs h-spacing-token-xs bg-primary rounded-sm" />
            <div className="w-spacing-token-s h-spacing-token-s bg-primary rounded-sm" />
            <div className="w-spacing-token-m h-spacing-token-m bg-primary rounded-sm" />
            <div className="w-spacing-token-l h-spacing-token-l bg-primary rounded-sm" />
          </div>

          <div className="space-y-2">
            <p className="text-label-lg font-semibold">Label large semibold (18px)</p>
            <p className="text-label font-bold">Label medium bold (16px)</p>
            <p className="text-label-sm font-extrabold">Label small extra bold (14px)</p>
            <p className="text-paragraph-lg">Paragraph large regular (18px)</p>
            <p className="text-paragraph">Paragraph medium regular (16px)</p>
            <p className="text-paragraph-sm">Paragraph small regular (14px)</p>
          </div>

          {nome && (
            <p className="text-paragraph text-muted-foreground">
              Olá, <strong className="text-foreground">{nome}</strong>! O tema está aplicado.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
