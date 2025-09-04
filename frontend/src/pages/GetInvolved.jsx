import { useState } from 'react'
import { api } from '../services/api'

export default function GetInvolved() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [ok, setOk] = useState(null)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/volunteers/', form)
      setOk(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setOk(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-saffron-600">Volunteer With Us</h1>
      <form onSubmit={onSubmit} className="bg-white rounded shadow p-6 mt-6 grid gap-4 max-w-xl">
        <input className="border rounded px-3 py-2" name="name" placeholder="Full Name" value={form.name} onChange={onChange} required />
        <input className="border rounded px-3 py-2" name="email" placeholder="Email" type="email" value={form.email} onChange={onChange} required />
        <input className="border rounded px-3 py-2" name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
        <textarea className="border rounded px-3 py-2" name="message" placeholder="Why do you want to join?" value={form.message} onChange={onChange} rows="4" />
        <button className="bg-saffron-600 text-white px-4 py-2 rounded hover:bg-orange-700" type="submit">Submit</button>
        {ok === true && <p className="text-green-700">Thanks! We will contact you soon.</p>}
        {ok === false && <p className="text-red-700">Something went wrong. Please try again.</p>}
      </form>
    </div>
  )
}
