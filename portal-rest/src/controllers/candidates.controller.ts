import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Candidates} from '../models';
import {CandidatesRepository} from '../repositories';

export class CandidatesController {
  constructor(
    @repository(CandidatesRepository)
    public candidatesRepository : CandidatesRepository,
  ) {}

  @post('/candidates', {
    responses: {
      '200': {
        description: 'Candidates model instance',
        content: {'application/json': {schema: getModelSchemaRef(Candidates)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidates, {
            title: 'NewCandidates',
            exclude: ['id'],
          }),
        },
      },
    })
    candidates: Omit<Candidates, 'id'>,
  ): Promise<Candidates> {
    return this.candidatesRepository.create(candidates);
  }

  @get('/candidates/count', {
    responses: {
      '200': {
        description: 'Candidates model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Candidates)) where?: Where<Candidates>,
  ): Promise<Count> {
    return this.candidatesRepository.count(where);
  }

  @get('/candidates', {
    responses: {
      '200': {
        description: 'Array of Candidates model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Candidates)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Candidates)) filter?: Filter<Candidates>,
  ): Promise<Candidates[]> {
    return this.candidatesRepository.find(filter);
  }

  @patch('/candidates', {
    responses: {
      '200': {
        description: 'Candidates PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidates, {partial: true}),
        },
      },
    })
    candidates: Candidates,
    @param.query.object('where', getWhereSchemaFor(Candidates)) where?: Where<Candidates>,
  ): Promise<Count> {
    return this.candidatesRepository.updateAll(candidates, where);
  }

  @get('/candidates/{id}', {
    responses: {
      '200': {
        description: 'Candidates model instance',
        content: {'application/json': {schema: getModelSchemaRef(Candidates)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Candidates> {
    return this.candidatesRepository.findById(id);
  }

  @patch('/candidates/{id}', {
    responses: {
      '204': {
        description: 'Candidates PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidates, {partial: true}),
        },
      },
    })
    candidates: Candidates,
  ): Promise<void> {
    await this.candidatesRepository.updateById(id, candidates);
  }

  @put('/candidates/{id}', {
    responses: {
      '204': {
        description: 'Candidates PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() candidates: Candidates,
  ): Promise<void> {
    await this.candidatesRepository.replaceById(id, candidates);
  }

  @del('/candidates/{id}', {
    responses: {
      '204': {
        description: 'Candidates DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.candidatesRepository.deleteById(id);
  }
}
