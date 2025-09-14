import PagedPanel from './components/PagedPanel'
import PersonCell from './components/PersonCell'
import { faker } from '@faker-js/faker';
const makePerson = ()=>{
  return {
    id: faker.number.int(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: faker.person.sex(),
    email: faker.internet.email()
  }
}

function App() {
  return (
    <>
      <PagedPanel page={0} hasPrevPage={true} isWaiting={false}>
        <PersonCell {...makePerson()}/>
      </PagedPanel>
    </>
  )
}

export default App
