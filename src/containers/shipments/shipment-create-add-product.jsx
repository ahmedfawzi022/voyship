import React, { useState, useEffect, Component } from 'react';
import {baseUrl, productImg} from '../../lib/constants';
import {Card, List, Button, Form, Grid, Dimmer} from "tabler-react";
import {useFetch} from '../../lib/useFetch';
import Select from 'react-select'

const ShipmentCreateAddProduct = ({showPage, saveProduct}) => {
  const [form, changeFormInput] = useState({
    link: null,
    name: null,
    category: null,
    subcategory: null,
    price:null,
    picture: null,
    quantity:1,
    weight: 0,
    details: 'no details'
  });
  const {data:product, loading:productLoading} = useFetch(`products/scrap/${form.link}`);
  useEffect(() => {
    product && product.name && changeFormInput({
      ...form,
      name:product.name,
      picture:product.picture === 'Cant Crawel Image' ? null : product.picture,
      price:product.price
    });
    return () => {
      changeFormInput({
        link: null,
        name: null,
        category: null,
        subcategory: null,
        price:null,
        uploadedpic: null,
        picture: null,
        quantity:1,
        weight: 0,
        details: null
      })
    }
  }, [product]);
  const {data:categories, loading:categoriesLoading} = useFetch(`categories`);
  const {data:subCategories, loading:subCategoriesLoading} = useFetch(`categories/${form.category && form.category.value}/sub-category`);
  return (
    <Grid>
      <Grid.Row>
        <Grid.Col width={4}>
        <Form.Label>picture:</Form.Label>
          <Dimmer
            active={!!form.link && !!productLoading}
            loader={!!form.link && !!productLoading}
          >
            <div style={{textAlign: 'center'}} className="mb-1">
              <img 
                alt=""
                src={form.picture || productImg}
                style={{maxHeight: '220px', margin:'0 auto'}}
              />
            </div>
          </Dimmer>
          {/* <Form.Input
            label='upload picture'
            placeholder='' 
            value={form.uploadedpic}
            type="file"
            onChange={(e) => changeFormInput({...form, uploadedpic:e.target.value})}
          /> */}
        </Grid.Col>
        <Grid.Col width={8}>
          <Form>
            <Grid>
              <Grid.Row>
                <Grid.Col width={12}>
                  <Form.Input
                    icon={!!form.link && !!productLoading ? "loader" : "search"}
                    position="append"
                    label="Link"
                    value={form.link}
                    type="text"
                    name="link"
                    placeholder="product url" 
                    onChange={(e) => changeFormInput({
                      ...form,
                      link:encodeURIComponent(e.target.value)
                    })}
                  />
                </Grid.Col>
              </Grid.Row>
              <Grid.Row>
                <Grid.Col width={6}>
                  <Form.Label>Category:</Form.Label>
                  <Select
                    value={form.category}
                    options={categories && categories.map(cat => {
                      return({label: cat.name, value:cat['_id']});
                    })}
                    placeholder="Category"
                    isLoading={categoriesLoading}
                    onChange={(e)=>{changeFormInput({
                      ...form,
                      category:e
                    })}}
                  />
                  <br />
                  <Form.Input
                    label="Price"
                    icon={!!form.link && !!productLoading ? "loader" : ""}
                    position="append"
                    value={form.price}
                    type="text"
                    name="price"
                    placeholder="price" 
                    onChange={(e) => changeFormInput({
                      ...form,
                      price:e.target.value
                    })}
                  />
                  <Form.Input
                    label="Quantity"
                    value={form.quantity}
                    type="text"
                    name="quantity"
                    placeholder="quantity" 
                    onChange={(e) => changeFormInput({...form, quantity:e.target.value})}
                  />
                  <Form.Textarea
                    label="Details"
                    value={form.details}
                    type="text"
                    name="product_details"
                    placeholder="Product details and notes" 
                    onChange={(e) => changeFormInput({
                      ...form,
                      details:e.target.value
                    })}
                  />
                  
                </Grid.Col>
                <Grid.Col width={6}>
                  <Form.Label>Sub Category:</Form.Label>
                  <Select
                    value={form.subcategory}
                    options={subCategories && subCategories.map(sub => {
                      return({label: sub.name, value:sub['_id']});
                    })}
                    placeholder="sub category"
                    isLoading={subCategoriesLoading}
                    onChange={(e)=>{changeFormInput({
                      ...form,
                      subcategory:e
                    })}}
                  />
                  <br />
                  <Form.Input
                    label="Name"
                    icon={!!form.link && !!productLoading ? "loader" : ""}
                    position="append"
                    value={form.name}
                    type="text"
                    name="name"
                    placeholder="name" 
                    onChange={(e) => changeFormInput({
                      ...form,
                      name:e.target.value
                    })}
                  />
                  <Form.Input
                    label="Weight"
                    value={form.weight}
                    type="text"
                    name="weight"
                    placeholder="weight" 
                    onChange={(e) => changeFormInput({
                      ...form,
                      weight:e.target.value
                    })}
                  />
                </Grid.Col>
              </Grid.Row>
            </Grid>
          </Form>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col width={4}></Grid.Col>
        <Grid.Col width={8}>
          <Button
            color="secondary" 
            size="sm" 
            onClick={()=>showPage('main')}
          >
            back
          </Button>
          <Button
            outline
            color="primary"
            size="sm" 
            className="ml-2"
            onClick={()=>{saveProduct(form);}}
          >
            Add
          </Button>
        </Grid.Col>
      </Grid.Row>
    </Grid>
  );
}
export default ShipmentCreateAddProduct;