import dbConnect from '../utils/dbConnect';
import Customer from '../models/Customer';
import CheckIn from '../models/CheckIn';
import { getCurrentTime } from '../utils/func';

dbConnect();

export const resolvers = {
  Query: {
    customers: () => Customer.find({}).sort({ created_date: -1 }),
    customer: async (_, args) => {
      const customer = await Customer.findOne({ phone: args.phone });

      return customer;
    },
    getTodayCheckIn: async () => {
      const checkIns = await CheckIn.find({
        date_checkIn: getCurrentTime('date'),
      });

      return checkIns;
    },
  },

  Mutation: {
    delete_checkin: async (_, args) => {
      const checkIn = await CheckIn.findByIdAndRemove(args.id);

      await Customer.findByIdAndUpdate(checkIn.customer, {
        $pull: { checkIn: checkIn._id },
      });

      return checkIn;
    },
    insert_customer: async (_, args) => {
      const {
        input: { first_name, last_name, phone },
        checkInInput,
      } = args;
      const checkExistedCustomer = await Customer.findOne({
        phone: args.input.phone,
      });

      if (!checkExistedCustomer) {
        const checkInCustomer = await CheckIn.create({
          ...checkInInput,
          time_checkIn: getCurrentTime('time'),
          date_checkIn: getCurrentTime('date'),
        });

        const customer = await Customer.create({
          first_name,
          last_name,
          phone,
          checkIn: checkInCustomer._id,
        });

        if (customer) {
          await CheckIn.findByIdAndUpdate(checkInCustomer._id, {
            customer: customer._id,
          });
        }

        return customer;
      }

      const newCheckIn = await CheckIn.create({
        ...checkInInput,
        customer: checkExistedCustomer._id,
        time_checkIn: getCurrentTime('time'),
        date_checkIn: getCurrentTime('date'),
      });

      const updateCustomer = await Customer.findByIdAndUpdate(
        checkExistedCustomer._id,
        {
          $push: {
            checkIn: newCheckIn._id,
          },
          first_name,
          last_name,
          phone,
        },
        { new: true }
      );

      return updateCustomer;
    },
  },

  Customer: {
    checkIn: async (parents) => {
      const checkIns = await CheckIn.find({
        _id: {
          $in: parents.checkIn,
        },
      });

      return checkIns;
    },
  },

  CheckIn: {
    customer: async (parents) => {
      const customer = await Customer.findById(parents.customer);

      return customer;
    },
  },
};
