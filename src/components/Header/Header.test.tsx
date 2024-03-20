import { render, screen } from '@testing-library/react'
import { Header } from '.'

describe("Header Component", () => {
    it("should render the Header correctly", () => {
        render(<Header />)
        screen.getByText("Conversas")
        screen.getByText("Salas Públicas")        
    })
})