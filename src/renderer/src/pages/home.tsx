import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Home() {
  const queryClient = useQueryClient()

  //Buscar os clientes 

  const { data } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await window.api.fetchAllCustomers()
      // console.log(response)
      return response
    }
  })

  // async function handleAdd() {
  //   

  // }


  // async function handleCustomerById() {
  //   const customers = await window.api.fetchAllCustomers()
  //   const id = customers[0]?._id

  //   if (!id) {
  //     console.log('Nenhum cliente cadastrado')
  //     return
  //   }

  //   const response = await window.api.fetchCustomerById(id)
  //   console.log(response)
  // }

  // async function handleDeleteCustomer() { 
  //   const customers = await window.api.fetchAllCustomers()
  //   const id = customers[0]?._id
  //   if (!id) {
  //     console.log('Nenhum cliente cadastrado')
  //     return
  //   }
  //   const response = await window.api.deleteCustomer(id)
  //   console.log(response)
  // }




  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.14),transparent_52%)] px-8 py-8 text-slate-100">
      <header className="mx-auto mb-8 w-full max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-400">
          Clientes
        </p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Todos os clientes
          </h1>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
            {data?.length ?? 0} cadastrados
          </span>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-3 pb-10">
        {data?.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center">
            <p className="text-lg font-medium text-white">Nenhum cliente ainda</p>
            <p className="mt-1 text-sm text-slate-400">
              Cadastre o primeiro cliente para vê-lo nesta lista.
            </p>
            <Link
              to="/create"
              className="mt-5 inline-flex rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-gray-950 transition hover:bg-emerald-400"
            >
              Cadastrar cliente
            </Link>
          </div>
        )}

        {data?.map((customer) => (
          <Link
            key={customer._id}
            to={`/customer/${customer._id}`}
            className="group rounded-2xl border border-white/10 bg-gray-900/80 px-5 py-4 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-gray-900"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-lg font-semibold text-emerald-300">
                {customer.name.slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-lg font-semibold text-white">{customer.name}</p>
                  <span
                    className={
                      customer.status
                        ? 'rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300'
                        : 'rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-400'
                    }
                  >
                    {customer.status ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                {customer.role && (
                  <p className="mt-0.5 text-sm text-slate-400">{customer.role}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-300">
                  <p>
                    <span className="mr-1.5 text-slate-500">Email</span>
                    {customer.email}
                  </p>
                  {customer.phone && (
                    <p>
                      <span className="mr-1.5 text-slate-500">Telefone</span>
                      {customer.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}  