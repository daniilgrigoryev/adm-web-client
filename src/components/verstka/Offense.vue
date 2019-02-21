<template>
    <div class="bg-blue-thin">
        <!-- <div class="px36 py24">
            <div class="">
                <span class="adm-h2 color-gray-medium">Возбуждение административного правонарушения Постановлением</span>
            </div>
        </div>
        <hr class="txt-hr my0">
        <div class="wmax1920">
            <Row type="flex">
                <Col :xs="24" :sm="8" :md="6" :lg="6">
                    <div class="bg-blue-thin h-full scroll-hidden">
                        <ul class="ml60 mr24 my24">
                            <li class=""><a href="" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Постановление составил</a></li>
                            <li class=""><a href="" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Лицо в отношении которого заводится дело</a></li>
                            <li class=""><a href="" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Транспортное средство</a></li>
                            <li class=""><a href="" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Владелец транспортного средства</a></li>
                            <li class=""><a href="" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Нарушение</a></li>
                            <li class=""><a href="" class="link color-blue-base adm-txt-regular txt-underline-on-hover py12 block">Решение по делу</a></li>
                        </ul>
                    </div>
                </Col>
                <Col :xs="24" :sm="16" :md="18" :lg="18"  class="border">
                    <div>
                        <div class="hmin360 px36 py12">
                            <Form :label-width="180" label-position="right">
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Номер постановления</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                        <Col :xs="24" :md="10" :lg="8">
                                            <a href="" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Получить уникальный номер</a>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Уникальный номер правонарушения</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Дата и Время вынесения</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Row type="flex" :gutter="8">
                                                <Col>
                                                    <DatePicker type="date" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
                                                </Col>
                                                <Col>
                                                    <TimePicker type="time" placeholder="Select time" class="wmin120 wmax180"></TimePicker>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Место вынесения</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                                        </Col>
                                        <Col :xs="24" :md="10" :lg="8">
                                            <a href="" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Адресный справочник</a>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>

                            <hr class="txt-hr my24">

                            <Form :label-width="200" label-position="right">
                                <h2 class="adm-text-big color-dark-light my12">Составил</h2>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Личный номер сотрудника</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                        <Col :xs="24" :md="14" :lg="8">
                                            <a href="" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Справочник сотрудников</a>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">ФИО сотрудника</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Должность сотрудника</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Звание</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Код подразделения</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                        <Col :xs="24" :md="14" :lg="8">
                                            <a href="" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Уполномеченные органы</a>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Подразделение</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>

                            <hr class="txt-hr my24">

                            <Form :label-width="200" label-position="right">
                                <Row :gutter="16" type="flex" align="middle">
                                    <Col>
                                        <h2 class="adm-text-big color-dark-light my12">Лицо в отношении которого заводится дело</h2>
                                    </Col>
                                    <Col >
                                        <Select class="wmax240 wmin180" value="0" placeholder=""> 
                                            <Option value="0">Физическое лицо</Option>
                                            <Option value="1">Юридическое лицо</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Тип физического лица:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Select class="wmin180" value="0" placeholder=""> 
                                                <Option value="0">Водитель</Option>
                                                <Option value="1">Не водитель</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Гражданство:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Select class="wmin180" value="0" placeholder=""> 
                                                <Option value="0">Россия</Option>
                                                <Option value="1">Узбекистан</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Документ удостоверяющий личность:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Select class="wmin180" value="0" placeholder=""> 
                                                <Option value="0">Паспорт</Option>
                                                <Option value="1">Права</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Номер документа:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Фамилия:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Имя:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Отчество:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Пол:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Select class="wmin180" value="0" placeholder=""> 
                                                <Option value="0">Мужской</Option>
                                                <Option value="1">Женский</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Дата рождения:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <DatePicker type="date" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Место рождения</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Прописка</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Адрес фактического проживания</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Телефон:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>

                            <hr class="txt-hr my24">

                            <Form :label-width="200" label-position="right">
                                <h2 class="adm-text-big color-dark-light my12">Транспортное средство</h2>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Номер ГРЗ автомобиля:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Марка:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Select filterable class="wmin180" value="0" placeholder="" > 
                                                <Option value="0">Мерседес</Option>
                                                <Option value="1">Тайота</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Модель:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Select filterable class="wmin180" value="0" placeholder="" > 
                                                <Option value="0">Мерседес</Option>
                                                <Option value="1">Тайота</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Тип кузова:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Select filterable class="wmin180" value="0" placeholder="" > 
                                                <Option value="0">Мерседес</Option>
                                                <Option value="1">Тайота</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>

                            <hr class="txt-hr my24">

                            <Form :label-width="200" label-position="right">
                                <Row :gutter="16" type="flex" align="middle">
                                    <Col>
                                        <h2 class="adm-text-big color-dark-light my12">Владелец транспортного средства</h2>
                                    </Col>
                                    <Col >
                                        <Select class="wmax300 wmin180" value="0" placeholder=""> 
                                            <Option value="0">Лицо в отношении которого заводится дело</Option>
                                            <Option value="1">Юридическое лицо</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Form>

                            <hr class="txt-hr my24">

                            <Form :label-width="200" label-position="right">
                                <h2 class="adm-text-big color-dark-light my12">Нарушение</h2>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Дата и Время вынесения</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Row type="flex" :gutter="8">
                                                <Col>
                                                    <DatePicker type="date" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
                                                </Col>
                                                <Col>
                                                    <TimePicker type="time" placeholder="Select time" class="wmin120 wmax180"></TimePicker>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Место нарушения</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">По пункту Нормативно-Правового Акта</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                        <Col :xs="24" :md="14" :lg="8">
                                            <div class="border-l  border--gray-light  pl12">
                                                <p class="adm-text-small txt-em">коментарии по данному пункту</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">По статье Административного Кодекса</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                        <Col :xs="24" :md="14" :lg="8">
                                            <div class="border-l  border--gray-light  pl12">
                                                <p class="adm-text-small txt-em">коментарии по даной статье Аднинистративного кодекса</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Код бютжетной классификации</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Сведенья по нарушению</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>

                            <hr class="txt-hr my24">

                            <Form :label-width="200" label-position="right">
                                <h2 class="adm-text-big color-dark-light my12">Решение по делу</h2>
                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Решение по правонарушению:</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Select filterable class="wmin180" value="0" placeholder="" > 
                                                <Option value="0">Административный штраф</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </FormItem>

                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Сумма штрафа</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Input  placeholder="Enter something..."></Input>
                                        </Col>
                                    </Row>
                                </FormItem>

                                <FormItem class="my12">
                                    <small class="adm-text-small color-gray-medium" slot="label">Дата вручения постановления</small>
                                    <Row :gutter="16" type="flex" align="middle">
                                        <Col :xs="24" :md="14" :lg="16">
                                            <Row type="flex">
                                                <Col>
                                                    <DatePicker type="date" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>
                            <a href="" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Дополнительное решение</a>
                        </div>
                        <div class="px36 py12 flex-parent flex-parent--end-main border-t border-b border--gray-faint bg-white-light">
                            <Button type="text">Отменить возбуждение дела</Button>
                            <Button type="primary" class="ml12">Возбудить</Button>
                        </div>
                        
                    </div>
                </Col>
            </Row>
        </div> -->

     <div class="wmax1920 mx-auto">
        <!-- <a href="#" @click="getPrev()">Назад</a> -->
        <div class="flex-parent flex-parent--center-main flex-parent--center-cross hmin600 scroll-auto" style="height: calc(100vh - 66px);">
            <div>
                <div class="mb30 ml6 my30">
                    <h1 class="adm-h1 color-gray-medium">Переход</h1>
                    <h3 class="adm-h3 color-gray-medium">в подсистемы МАДИ</h3>
                </div>
                <Row type="flex" justify="center">
                    <Col>
                        <Card class="card my6 mx6 wmin360 round-bold px12 py12 cursor-pointer card-practique">
                            <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                                Административная<br> 
                                практика
                            </h3>
                            <p class="card__description adm-text-small color-gray-medium my12">
                                Административная <br>
                                ответственность за соблюдение <br>  
                                правил ПДД
                            </p>
                            <div class="card__version adm-text-small">v.0.37</div>
                        </Card>
                    </Col>
                    <Col>
                        <Card class="card my6 mx6 wmin360 round-bold px12 py12 cursor-pointer card-man">
                            <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                                Обращения граждан
                            </h3>
                            <p class="card__description adm-text-small color-gray-medium my12">
                                Документооброт по по ведению <br>
                                документов обращений
                            </p>
                            <div class="card__version adm-text-small">v.0.37</div>
                        </Card>
                    </Col>
                    <Col>
                        <Card class="card my6 mx6 wmin360 round-bold px12 py12 cursor-pointer card-practique">
                            <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                                Эвакуация
                            </h3>
                            <p class="card__description adm-text-small color-gray-medium my12">
                                Ведение документооборота <br>
                                по эвакуации ТС
                            </p>
                            <div class="card__version adm-text-small">v.0.37</div>
                        </Card>
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col>
                        <Card class="card my6 mx6 wmin360 round-bold px12 py12 cursor-pointer card-practique">
                            <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                                Карточка-ссылка 
                            </h3>
                            <p class="card__description adm-text-small color-gray-medium my12">
                                Здесь короткое описание <br>
                                назначения модуля
                            </p>
                            <div class="card__version adm-text-small">v.0.37</div>
                        </Card>
                    </Col>
                    <Col>
                        <Card class="card my6 mx6 wmin360 round-bold px12 py12 cursor-pointer card-practique">
                            <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                                Карточка-ссылка 
                            </h3>
                            <p class="card__description adm-text-small color-gray-medium my12">
                                Здесь короткое описание <br>
                                назначения модуля
                            </p>
                            <div class="card__version adm-text-small">v.0.37</div>
                        </Card>
                    </Col>
                    <Col>
                        <Card class="card my6 mx6 wmin360 round-bold px12 py12 cursor-pointer card-practique">
                            <h3 class="card__title adm-h3 color-gray-medium" style="line-height: 24px;">
                                Карточка-ссылка 
                            </h3>
                            <p class="card__description adm-text-small color-gray-medium my12">
                                Здесь короткое описание <br>
                                назначения модуля
                            </p>
                            <div class="card__version adm-text-small">v.0.37</div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
      </div>
    </div>
</template>


<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";
import * as formStack from '../../assets/js/api/formStack';
import RequestApi from "../../assets/js/api/requestApi";
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			isCollapsed: true
		}
	},
	computed: {
		menuitemClasses () {
			return [
				'menu-item',
				this.isCollapsed ? 'collapsed-menu' : ''
			]
		}
	},
	methods: {
		getPrev() {
			try {
				formStack.toPrev({
					vm: this
				});
			} catch (e) {
				alert(e.message);
			}
		},
		collapsedSider () {
			this.$refs.side1.toggleCollapse();
		}
	}
}
</script>
