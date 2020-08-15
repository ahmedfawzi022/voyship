import React, { useState, Component, useEffect } from 'react';
import Modal from 'react-modal';
import { mainModalStyle } from '../../lib/constants'

import ShipmentViewModal from '../../containers/shipments/shipment-view'
import ShipmentCreateModal from '../../containers/shipments/shipment-create'
import TripViewModal from '../../containers/trips/trip-view'
import TripChatModal from '../../containers/trips/trip-chat'
import AdminUserViewModal from '../../containers/adminUsers/admin-user-view'
import AdminUserCreateModal from '../../containers/adminUsers/admin-user-create'
import UserViewModal from '../../containers/users/user-view'
import UserCreateModal from '../../containers/users/user-create'
import ProductViewModal from '../../containers/products/product-view'
import ProductCreateModal from '../../containers/products/product-create'
import CountryViewModal from '../../containers/countries/country-view'
import CountryCreateModal from '../../containers/countries/country-create'
import CityCreateModal from '../../containers/countries/city-create'
import CategoryViewModal from '../../containers/products/category-view'
import CategoryCreateModal from '../../containers/products/category-create'
import SubCategoryCreateModal from '../../containers/products/sub-category-create'
import StoreCreateModal from '../../containers/products/store-create'
import TripCreateModal from '../../containers/trips/trip-create'
import StoryCreateModal from '../../containers/countries/story-create'
import ShipmentAssignModal from '../../containers/shipments/shipment-assign'
import ConfirmDeleteModal from './confirm-delete'

const style = { ...mainModalStyle }
const MainModal = ({
  closeMainModal,
  openMainModal,
  modalVisible,
  recordId,
  modalVariant
}) => {
  return (
    <Modal
      shouldCloseOnOverlayClick={true}
      isOpen={modalVisible}
      onRequestClose={() => closeMainModal()}
      overlayClassName="overlay"
      style={style}
    >
      {modalVariant === 'shipment-view' &&
        <ShipmentViewModal
          recordId={recordId}
          closeMainModal={closeMainModal}
          openMainModal={openMainModal}
        />
      }
      {modalVariant === 'shipment-assign' &&
        <ShipmentAssignModal
          recordId={recordId}
          closeMainModal={closeMainModal}
          openMainModal={openMainModal}
        />
      }
      {modalVariant === 'trip-view' &&
        <TripViewModal
          recordId={recordId}
          closeMainModal={closeMainModal}
        />
      }
      {modalVariant === 'trip-chat' &&
        <TripChatModal
          recordId={recordId}
          closeMainModal={closeMainModal}
        />
      }
      {modalVariant === 'admin-user-view' && recordId &&
        <AdminUserViewModal
          recordId={recordId}
          closeMainModal={closeMainModal}
        />
      }
      {modalVariant === 'user-view' && recordId &&
        <UserViewModal
          recordId={recordId}
          closeMainModal={closeMainModal}
        />
      }
      {modalVariant === 'product-view' &&
        <ProductViewModal
          recordId={recordId}
          closeMainModal={closeMainModal}
        />
      }
      {modalVariant === 'country-view' && recordId &&
        <CountryViewModal
          recordId={recordId}
          closeMainModal={closeMainModal}
          openMainModal={openMainModal}
        />
      }

      {modalVariant === 'category-view' && recordId &&
        <CategoryViewModal
          recordId={recordId}
          closeMainModal={closeMainModal}
          openMainModal={openMainModal}
        />
      }

      {/** create modals **/}
      {modalVariant === 'shipment-create' &&
        <ShipmentCreateModal
          closeMainModal={closeMainModal}
        />
      }
      {modalVariant === 'trip-create' &&
        <TripCreateModal
          closeMainModal={closeMainModal}
        />
      }

      {modalVariant === 'admin-user-create' &&
        <AdminUserCreateModal
          closeMainModal={closeMainModal}
        />
      }

      {modalVariant === 'user-create' &&
        <UserCreateModal
          closeMainModal={closeMainModal}
        />
      }

      {modalVariant === 'product-create' &&
        <ProductCreateModal
          closeMainModal={closeMainModal}
        />
      }

      {modalVariant === 'country-create' &&
        <CountryCreateModal
          closeMainModal={closeMainModal}
        />
      }

      {modalVariant === 'city-create' &&
        <CityCreateModal
          closeMainModal={closeMainModal}
        />
      }

      {modalVariant === 'category-create' &&
        <CategoryCreateModal
          closeMainModal={closeMainModal}
        />
      }

      {modalVariant === 'sub-category-create' &&
        <SubCategoryCreateModal
          closeMainModal={closeMainModal}
        />
      }

      {modalVariant === 'store-create' &&
        <StoreCreateModal
          closeMainModal={closeMainModal}
        />
      }

      {modalVariant === 'story-create' &&
        <StoryCreateModal
          closeMainModal={closeMainModal}
        />
      }

      {modalVariant && modalVariant.split('-')[1] === 'delete' &&
        <ConfirmDeleteModal
          closeMainModal={closeMainModal}
          type={modalVariant.split('-')[0]}
          recordId={recordId}
        />
      }
    </Modal>
  )
}
export default MainModal;