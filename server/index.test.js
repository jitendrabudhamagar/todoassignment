import { expect } from 'chai';

const base_url = 'http://localhost:3001'

describe('GET Tasks', () => {
    it('should get all tasks', async () => {
        const response = await fetch(base_url + '/', )
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an('array').that.is.not.empty
        expect(data[0]).to.include.all.keys('id', 'description')
    });
});

describe('POST Task', () => {
    it('should create a new task', async () => {
        const response = await fetch(base_url + '/create/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ 'description': 'Task from unit test' })
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    });
    it ( 'should not post a task without a description', async () => {
        const response = await fetch(base_url + '/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'title': 'Task from unit test' })
        })
        const data = await response.json()
        expect(response.status).to.equal(500)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    });
});    

describe('DELETE Task', () => {
    it('should delete a task', async () => {
        const response = await fetch(base_url + '/delete/1', {
            method: 'delete',
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    });
    it ('should not delete a task  with SQL injection', async () => {
        const response = await fetch(base_url + '/delete/id=0 or id > 0', {
            method: 'delete',
        })
        const data = await response.json()
        expect(response.status).to.equal(500)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    });
});