import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Title, Form, Products, Error } from './styles';

interface Product {
    name: string;
    id: number;
}

const Home: React.FC = () => {
    const [newProduct, setNewProduct] = useState('');
    const [inputError, setInputError] = useState('');
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get('/products').then((response) => {
            setProducts(response.data?.products);
        });
    }, []);

    async function handleAddProduct(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!newProduct) {
            setInputError('Nenhum produto digitado.');
            return;
        }

        try {
            const response = await api.post('/products', {
                'name': newProduct
            });
    
            console.log(response);
            const product = response.data?.product;
    
            setProducts([ ...products, product ]);
            setNewProduct('');
            setInputError('');
        } catch (err) {
            setInputError('Erro ao adicionar novo produto');
        }
    }

    return (
        <>
            <Title>Adicione um novo produto</Title>

            <Form hasError={ !!inputError } onSubmit={handleAddProduct}>
                <input 
                    placeholder="Digite o nome do produto"
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                />
                <button type="submit">Adicionar</button>
            </Form>

            { inputError && <Error>{inputError}</Error> }

            <Products>
                {products.map(product => (
                    <Link 
                        key={product.id} 
                        to={`/product/${product.id}`}
                    >
                        <div>
                            <strong>{product.name}</strong>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Products>
        </>
    );
}

export default Home;
