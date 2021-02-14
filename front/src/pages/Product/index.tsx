import React, { useEffect, useState, FormEvent } from 'react';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import { FiChevronLeft, FiTrash2, FiEdit2 } from 'react-icons/fi';

import api from '../../services/api';

import { Header, ProductInfo, Action, Form, Actions } from './styles';

interface ProductParams {
    product_id: string;
}

interface ProductInterface {
    name: string;
    id: number;
}

const Product: React.FC = () => {
    const history = useHistory();
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const [editEnabled, setEditEnabled] = useState<boolean>(false);
    const [newProduct, setNewProduct] = useState<string>('');

    const { params } = useRouteMatch<ProductParams>();

    useEffect(() => {
        api.get(`/products/${params.product_id}`).then((response) => {
            setProduct(response.data?.product);
        });
    }, [params.product_id]);

    async function handleDelete(id: number) {
        try {
            await api.delete(`/products/${id}`);
            history.push('/');
        } catch (err) {
            alert('Erro ao excluir produto');
        }
    }

    async function handleEditProduct(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        try {
            const response = await api.put(`/products/${params.product_id}`, {
                'name': newProduct
            });
    
            setProduct(response.data?.product);
            setEditEnabled(false);
        } catch (err) {
            alert('Erro ao atualizar o produto');
        }
    }

    return (
        <>
            <Header>
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {product && (
                <ProductInfo>
                    <header>
                        {!editEnabled && (
                            <div>
                                <strong>{product.name}</strong>
                            </div>
                        )}
                        {editEnabled && (
                            <div>
                                <Form onSubmit={handleEditProduct}>
                                    <input 
                                        placeholder="Digite o nome"
                                        value={newProduct}
                                        onChange={(e) => setNewProduct(e.target.value)}
                                    />
                                    <button type="submit">Salvar</button>
                                </Form>
                            </div>
                        )}
                    </header>
                    <Actions>

                        <Action onClick={() => handleDelete(product.id)}>
                            <FiTrash2 size={20} /> Excluir
                        </Action>

                        <Action onClick={() => setEditEnabled(true)}>
                            <FiEdit2 size={20} /> Editar
                        </Action>

                    </Actions>
                </ProductInfo>
            )}
        </>
    );
}

export default Product;