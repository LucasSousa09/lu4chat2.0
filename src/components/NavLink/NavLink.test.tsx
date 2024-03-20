import { render, screen } from "@testing-library/react"
import { NavLink } from "."

describe('NavLink Component', () => {
    it("should display the correct link text", () => {
        render(<NavLink linkTo="/test" >Test</NavLink>)
        screen.getByText("Test")
    })
})