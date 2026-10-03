import { useQuery } from '@tanstack/react-query'

export default function About() {
  const { data, isFetching } = useQuery({
    queryKey: ['version-app'],
    queryFn: async () => {
      const response = await window.api.getVersionApp()
      return response
    }
  })

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.14),transparent_52%)] px-8 py-8 text-slate-100">
      <h1 className="mb-6 text-2xl font-semibold text-white">pagina sobre</h1>

      <p>
        Projeto criado no curso <b>@luciano</b>
      </p>
      <p>Versão atual do projeto: {!isFetching && data}</p>
    </div>
  )
}
