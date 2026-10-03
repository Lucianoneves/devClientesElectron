import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash } from 'phosphor-react'

export default function Detail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutateAsync: removeCustomer, isPending: isDeleting } = useMutation({
    mutationFn: async (docId: string) => {
      await window.api.deleteCustomer(docId)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customers'] })
      navigate('/')
    }
  })

  async function handleDeleteCustomer() {
    if (!id) return

    const confirmed = window.confirm('Excluir este cliente?')
    if (!confirmed) return

    await removeCustomer(id)
  }

  const { data, isPending, isError } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      const response = await window.api.fetchCustomerById(id!)
      return response
    },
    enabled: !!id
  })

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.14),transparent_52%)] px-10 py-8 text-slate-100">
      <Link to="/" className="mb-6 flex w-fit items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-200">
        <ArrowLeft className="h-4 w-4 text-white" />
        <span>Voltar</span>
      </Link>

      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-white lg:text-2xl">
          Detalhes do cliente
        </h1>
        {data && (
          <button
            type="button"
            onClick={handleDeleteCustomer}
            disabled={isDeleting}
            aria-label="Excluir cliente"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 transition hover:bg-rose-500/20 disabled:opacity-50"
          >
            <Trash className="h-5 w-5" />
          </button>
        )}
      </div>

      <section className="flex w-full max-w-3xl flex-col gap-6">
        {isPending && <p className="text-sm text-slate-400">Carregando cliente...</p>}

        {isError && (
          <p className="text-sm text-rose-300">Não foi possível carregar este cliente.</p>
        )}

        {data && (
          <article className="rounded-2xl border border-white/10 bg-gray-900/80 p-6 shadow-lg shadow-black/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-2xl font-semibold text-white">{data.name}</p>
                {data.role && <p className="mt-1 text-sm text-slate-400">{data.role}</p>}
              </div>
              <span
                className={
                  data.status
                    ? 'rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300'
                    : 'rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-400'
                }
              >
                {data.status ? 'Ativo' : 'Inativo'}
              </span>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">Email</dt>
                <dd className="mt-1 text-slate-100">{data.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">Telefone</dt>
                <dd className="mt-1 text-slate-100">{data.phone || 'Não informado'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-slate-500">Endereço</dt>
                <dd className="mt-1 text-slate-100">{data.address || 'Não informado'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-slate-500">Cargo</dt>
                <dd className="mt-1 text-slate-100">{data.role || 'Não informado'}</dd>

              </div>

            </dl>
          </article>
        )}
      </section>
    </main>
  )
}