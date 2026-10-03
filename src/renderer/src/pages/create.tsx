import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useRef } from 'react'
import { NewCustomer } from '~/src/shared/types/ipc'
import { useNavigate } from 'react-router-dom'

interface DataMutation {
  name: string
  address: string
  email: string
  phone: string
  role: string
}



export default function Create() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const nameRef = useRef<HTMLInputElement | null>(null)
  const addressRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const phoneRef = useRef<HTMLInputElement | null>(null)
  const roleRef = useRef<HTMLInputElement | null>(null)
  const statusRef = useRef<HTMLInputElement | null>(null)

  const { isPending, mutateAsync: createCustomer } = useMutation({
    mutationFn: async (data: NewCustomer) => {

      await window.api.addCustomer({
        name: data.name,
        address: data.address,
        email: data.email,
        phone: data.phone,
        role: data.role,
        status: true
      }).then((response) => {
        console.log("Deu certo e cadastro")
        navigate('/')
      })
        .catch((error) => {
          console.log("Deu errado ao cadastrar o cliente")

        })
    },

    onSuccess: () => {// Invalida as queries para atualizar a lista de clientes
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    }
  })


  async function handleAddCustomer(e: FormEvent) {
    e.preventDefault();



    const name = nameRef.current?.value
    const address = addressRef.current?.value
    const email = emailRef.current?.value
    const phone = phoneRef.current?.value
    const role = roleRef.current?.value


    if (!name || !address || !email || !phone || !role) {
      return;
    }

    await createCustomer({
      name: name,
      address: address,
      email: email,
      phone: phone,
      role: role,
      status: true
    })


  }
  return (

    <div className="min-h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.09),transparent_50%)] px-8 py-8 text-slate-100 overflow-y-auto">
      <section className="flex flex-1 flex-col items-center ">
        <h1 className="text-white font-semibold text-xl lg:text-3xl">
          Cdastrar novo  cliente</h1>

        <form className=" w-full max-w-96 mt-4" onSubmit={handleAddCustomer}>
          <div className=" mb-2">
            <label className=" text-lg">Nome:</label>
            <input
              type="text"
              placeholder="Digite o nome do cliente"
              className="w-full h-9 rounded bg-white px-2 text-gray-950"
              ref={nameRef}
            />
          </div>
          <div className=" mb-2">
            <label className=" text-lg">Endereço:</label>
            <input
              type="text"
              placeholder="Digite o endereço "
              className="w-full h-9 rounded bg-white px-2 text-gray-950"
              ref={addressRef}
            />
          </div>
          <div className=" mb-2">
            <label className=" text-lg">EMail:</label>
            <input
              type="text"
              placeholder="Digite o email "
              className="w-full h-9 rounded bg-white px-2 text-gray-950"
              ref={emailRef}
            />
          </div>

          <div className=" mb-2">
            <label className=" text-lg">Cargo:</label>
            <input
              type="text"
              placeholder="Digite o cargo do cliente"
              className="w-full h-9 rounded bg-white px-2 text-gray-950"
              ref={roleRef}
            />
          </div>
          <div className=" mb-6">
            <label className=" text-lg">Telefone:</label>
            <input
              type="text"
              placeholder="Digite o telefone do cliente"
              className="w-full h-9 rounded bg-white px-2 text-gray-950"
              ref={phoneRef}
            />
          </div>

          <button
            type="submit"
            className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-emerald-500 text-sm font-semibold text-gray-950 transition hover:bg-emerald-400 disabled:bg-gray-500"
            disabled={isPending}
          >
            Cadastrar cliente
          </button>






        </form>

      </section>
    </div>


  )
}
